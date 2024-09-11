import { AvatarsImplementation } from "@/infra/repositories/implementations/avatarsImplementation";
import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class GetAvatarByIdUseCase {
  constructor(private avatarsImplementation: AvatarsImplementation) {}
  async execute(id: string) {
    const avatar = await this.avatarsImplementation.getAvatarById(id)
    if (!avatar) {
      throw new NotFoundException("Avatar not found");
    }
    return avatar;
  }
}
