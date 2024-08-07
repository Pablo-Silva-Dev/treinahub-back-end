import { UsersImplementation } from "@/infra/repositories/implementations/usersImplementation";
import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class GetUserByCpfUseCase {
  constructor(private usersImplementation: UsersImplementation) {}
  async execute(cpf: string) {
    const user = await this.usersImplementation.getUserByCpf(cpf);
    if (!user) {
      throw new NotFoundException("User not found");
    }
    return user;
  }
}
