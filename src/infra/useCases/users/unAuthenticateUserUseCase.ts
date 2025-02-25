import { IUnAuthenticateUserDTO } from "@/infra/dtos/UserDTO";
import { UsersImplementation } from "@/infra/repositories/implementations/usersImplementation";
import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class UnAuthenticateUserUseCase {
  constructor(private usersImplementation: UsersImplementation) {}
  async execute(data: IUnAuthenticateUserDTO) {
    const { email } = data;
    const user = await this.usersImplementation.getUserByEmail(email);
    if (!user) {
      throw new NotFoundException("User not found");
    }
    await this.usersImplementation.unAuthenticateUser({ email });
    return { message: "User unauthenticated" };
  }
}
