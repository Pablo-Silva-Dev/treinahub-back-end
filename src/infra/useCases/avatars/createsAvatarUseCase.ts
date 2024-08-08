import { ICreateAvatarDTO } from "@/infra/dtos/AvatarDTO";
import { AvatarsImplementation } from "@/infra/repositories/implementations/avatarsImplementation";
import { UsersImplementation } from "@/infra/repositories/implementations/usersImplementation";
import { ConflictException, Injectable } from "@nestjs/common";

@Injectable()
export class CreateAvatarUseCase {
  constructor(
    private avatarsImplementation: AvatarsImplementation,
    private usersImplementation: UsersImplementation
  ) {}
  async execute(data: ICreateAvatarDTO) {
    const { user_id } = data;
    const user = await this.usersImplementation.getUserById(user_id);
    if (!user) {
      throw new ConflictException("User not found");
    }

    const userAlreadyHasAvatar =
      await this.avatarsImplementation.getAvatarByUserId(user_id);

    if (userAlreadyHasAvatar) {
      throw new ConflictException(
        "This user has an avatar already. Try updating it instead of creating a new one."
      );
    }

    const newAvatar = await this.avatarsImplementation.createAvatar(data);
    return newAvatar;
  }
}
