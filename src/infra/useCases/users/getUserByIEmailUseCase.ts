import { UsersImplementation } from "@/infra/repositories/implementations/usersImplementation";
import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class GetUserByEmailUseCase {
  constructor(private usersImplementation: UsersImplementation) {}
  async execute(email: string) {
    const user = await this.usersImplementation.getUserByEmail(email);
    if (!user) {
      throw new NotFoundException("User not found");
    }
    return user;
  }
}
