import { AvatarsImplementation } from "@/infra/repositories/implementations/avatarsImplementation";
import { UsersImplementation } from "@/infra/repositories/implementations/usersImplementation";
import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class DeleteUserAvatarUseCase {
  constructor(
    private avatarsImplementation: AvatarsImplementation,
    private usersImplementation: UsersImplementation
  ) {}
  async execute(userId: string) {
    const user = await this.usersImplementation.getUserById(userId);
    if (!user) {
      throw new NotFoundException("User not found");
    }
    await this.avatarsImplementation.deleteAvatarByUserId(userId);
  }
}
