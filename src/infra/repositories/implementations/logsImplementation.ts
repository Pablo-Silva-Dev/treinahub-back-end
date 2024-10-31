import { ICreateLogDTO, ILogDTO } from "@/infra/dtos/LogDTO";
import { PrismaService } from "@/infra/services/prisma";
import { Injectable } from "@nestjs/common";
import { ILogsRepository } from "../interfaces/logsRepository";

@Injectable()
export class LogsImplementation implements ILogsRepository {
  constructor(private prisma: PrismaService) {}
  async createLog(data: ICreateLogDTO): Promise<ILogDTO> {
    const { user_id } = data;
    const user = await this.prisma.user.findUnique({
      where: {
        id: user_id,
      },
    });
    if (!user) {
      return;
    }
    const createdLog = await this.prisma.log.create({ data } as never);
    return createdLog;
  }
  async listLogs(companyId: string): Promise<ILogDTO[]> {
    const logs = await this.prisma.log.findMany({
      include: { user: true },
    });
    const company = await this.prisma.company.findUnique({
      where: {
        id: companyId,
      },
    });

    if(!company){
      return null
    }

    return logs;
  }
}
