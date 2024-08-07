import { UsersImplementation } from "@/infra/repositories/implementations/usersImplementation";
import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class GetUserByIdUseCase {
  constructor(private usersImplementation: UsersImplementation) {}
  async execute(id: string) {
    const user = await this.usersImplementation.getUserById(id);
    if (!user) {
      throw new NotFoundException("User not found");
    }
    return user;
  }
}