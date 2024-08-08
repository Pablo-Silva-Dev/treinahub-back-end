import { IUpdateAvatarDTO } from "@/infra/dtos/AvatarDTO";
import { AvatarsImplementation } from "@/infra/repositories/implementations/avatarsImplementation";
import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class UpdateAvatarUseCase {
  constructor(private avatarsImplementation: AvatarsImplementation) {}
  async execute(data: IUpdateAvatarDTO) {
    const { id } = data;
    const avatar = await this.avatarsImplementation.getAvatarById(id);
    if (!avatar) {
      throw new NotFoundException("Avatar not found");
    }

    const updatedAvatar = await this.avatarsImplementation.updateAvatar(data);
    return updatedAvatar;
  }
}
