import { UsersImplementation } from "@/infra/repositories/implementations/usersImplementation";
import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class GetUserByPhoneUseCase {
  constructor(private usersImplementation: UsersImplementation) {}
  async execute(Phone: string) {
    const user = await this.usersImplementation.getUserByPhone(Phone);
    if (!user) {
      throw new NotFoundException("User not found");
    }
    return user;
  }
}
