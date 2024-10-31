import { ListLogsUseCase } from "@/infra/useCases/logs/listLogsUseCase";
import {
  ConflictException,
  Controller,
  Get,
  HttpCode,
  Param,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Controller("/logs/list")
@UseGuards(AuthGuard("jwt-admin"))
export class ListLogsController {
  constructor(private listLogsUseCase: ListLogsUseCase) {}
  @Get(":companyId")
  @HttpCode(200)
  async handle(@Param("companyId") companyId: string) {
    try {
      const logs = await this.listLogsUseCase.execute(companyId);
      return logs;
    } catch (error) {
      console.log("[INTERNAL ERROR]", error.message);
      throw new ConflictException({
        message: "An error occurred.",
        error: error.message,
      });
    }
  }
}
