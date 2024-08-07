import { IUpdateUserDTO } from "@/infra/dtos/UserDTO";
import { UsersImplementation } from "@/infra/repositories/implementations/usersImplementation";
import { Injectable, NotFoundException } from "@nestjs/common";
import { hash } from "bcryptjs";

@Injectable()
export class UpdateUserUseCase {
  constructor(private usersImplementation: UsersImplementation) {}
  async execute(data: IUpdateUserDTO) {
    const PASSWORD_ENCRYPTION_SALT_LEVEL = 6;

    const { id, password } = data;

    const user = await this.usersImplementation.getUserById(id);
    if (!user) {
      throw new NotFoundException("User not found");
    }
    const encryptedPassword = await hash(
      password,
      PASSWORD_ENCRYPTION_SALT_LEVEL
    );

    const updatedUser = await this.usersImplementation.updateUser({
      ...data,
      password: encryptedPassword,
    });
    return updatedUser;
  }
}
