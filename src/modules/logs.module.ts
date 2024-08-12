import { CreateLogController } from "@/infra/controllers/logs/createLogController";
import { ListLogsController } from "@/infra/controllers/logs/listLogsController";
import { LogsImplementation } from "@/infra/repositories/implementations/logsImplementation";
import { UsersImplementation } from "@/infra/repositories/implementations/usersImplementation";
import { PrismaService } from "@/infra/services/prisma";
import { CreateLogUseCase } from "@/infra/useCases/logs/createLogUseCase";
import { ListLogsUseCase } from "@/infra/useCases/logs/listLogsUseCase";
import { Module } from "@nestjs/common";

@Module({
  providers: [
    PrismaService,
    LogsImplementation,
    UsersImplementation,
    CreateLogUseCase,
    ListLogsUseCase,
  ],
  controllers: [CreateLogController, ListLogsController],
})
export class LogsModule {}
