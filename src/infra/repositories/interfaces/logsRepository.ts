import { ICreateLogDTO, ILogDTO } from "@/infra/dtos/LogDTO";

export interface ILogsRepository {
  createLog(data: ICreateLogDTO): Promise<ILogDTO>;
  listLogs(): Promise<ILogDTO[]>;
}
