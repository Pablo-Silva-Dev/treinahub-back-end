import { ICreateLogDTO } from "@/infra/dtos/LogDTO";
import { LogsImplementation } from "@/infra/repositories/implementations/logsImplementation";
import { UsersImplementation } from "@/infra/repositories/implementations/usersImplementation";
import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class CreateLogUseCase {
  constructor(
    private logsImplementation: LogsImplementation,
    private usersImplementation: UsersImplementation
  ) {}
  async execute(data: ICreateLogDTO) {
    const { user_id } = data;

    const user = await this.usersImplementation.getUserById(user_id);

    if (!user) {
      throw new NotFoundException("User not found");
    }

    const newLog = await this.logsImplementation.createLog(data);
    return newLog;
  }
}
