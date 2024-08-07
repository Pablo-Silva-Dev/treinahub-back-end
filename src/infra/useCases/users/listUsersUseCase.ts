import { Injectable } from "@nestjs/common";
import { UsersImplementation } from "src/infra/repositories/implementations/usersImplementation";

@Injectable()
export class ListUsersUseCase {
  constructor(private usersImplementation: UsersImplementation) {}
  async execute() {
    const users = await this.usersImplementation.listUsers();
    return users;
  }
}
