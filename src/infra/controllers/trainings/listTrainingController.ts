import { ListTrainingsUseCase } from "@/infra/useCases/trainings/listTrainingsUseCase";
import { Controller, Get, HttpCode } from "@nestjs/common";

@Controller("/trainings/list")
export class ListTrainingsController {
  constructor(private listTrainingsUseCase: ListTrainingsUseCase) {}
  @Get()
  @HttpCode(200)
  async handle() {
    const trainings = await this.listTrainingsUseCase.execute();
    return trainings;
  }
}
