import { UsersImplementation } from "@/infra/repositories/implementations/usersImplementation";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ListUsersUseCase {
  constructor(private usersImplementation: UsersImplementation) {}
  async execute() {
    const users = await this.usersImplementation.listUsers();
    return users;
  }
}
