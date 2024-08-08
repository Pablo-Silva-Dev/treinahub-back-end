import { AvatarsImplementation } from "@/infra/repositories/implementations/avatarsImplementation";
import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class GetAvatarByUserIdUseCase {
  constructor(private avatarsImplementation: AvatarsImplementation) {}
  async execute(id: string) {
    const avatar = await this.avatarsImplementation.getAvatarByUserId(id);
    if (!avatar) {
      throw new NotFoundException("User not found");
    }
    return avatar;
  }
}
