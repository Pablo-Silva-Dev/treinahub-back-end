import { ListTrainingsUseCase } from "@/infra/useCases/trainings/listTrainingsUseCase";
import { ConflictException, Controller, Get, HttpCode } from "@nestjs/common";

@Controller("/trainings/list")
export class ListTrainingsController {
  constructor(private listTrainingsUseCase: ListTrainingsUseCase) {}
  @Get()
  @HttpCode(200)
  async handle() {
    try {
      const trainings = await this.listTrainingsUseCase.execute();
      return trainings;
    } catch (error) {
      console.log("[INTERNAL ERROR]", error.message);
      throw new ConflictException({
        message:
          "An error occurred. Check all request body fields for possible mismatching.",
        error: error.message,
      });
    }
  }
}
