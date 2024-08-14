import { IAuthenticateUserDTO } from "@/infra/dtos/UserDTO";
import { UsersImplementation } from "@/infra/repositories/implementations/usersImplementation";
import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class AuthenticateUserUseCase {
  constructor(private usersImplementation: UsersImplementation) {}
  async execute(data: IAuthenticateUserDTO) {
    const { email } = data;
    const user = await this.usersImplementation.getUserByEmail(email);
    if (!user) {
      throw new NotFoundException("User not found");
    }
    const token = await this.usersImplementation.authenticateUser(data);
    if (!token) {
      throw new NotFoundException("Credentials not match");
    }
    return token;
  }
}
