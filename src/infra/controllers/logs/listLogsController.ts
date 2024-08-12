import { ListLogsUseCase } from "@/infra/useCases/logs/listLogsUseCase";
import { ConflictException, Controller, Get, HttpCode } from "@nestjs/common";

@Controller("/logs/list")
export class ListLogsController {
  constructor(private listLogsUseCase: ListLogsUseCase) {}
  @Get()
  @HttpCode(200)
  async handle() {
    try {
      const logs = await this.listLogsUseCase.execute();
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
