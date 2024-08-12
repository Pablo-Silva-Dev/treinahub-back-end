import { LogsImplementation } from "@/infra/repositories/implementations/logsImplementation";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ListLogsUseCase {
  constructor(private logsImplementation: LogsImplementation) {}
  async execute() {
    const logs = await this.logsImplementation.listLogs();
    return logs;
  }
}
