import { Controller, Get, HttpCode, Param } from "@nestjs/common";
import { GetTrainingByIdUseCase } from "../../useCases/trainings/getTrainingByIdUseCase";

@Controller("/trainings/get-by-id")
export class GetTrainingByIdController {
  constructor(private getTrainingByIdUseCase: GetTrainingByIdUseCase) {}
  @HttpCode(200)
  @Get(":trainingId")
  async handle(@Param("trainingId") trainingId: string) {
    const training = await this.getTrainingByIdUseCase.execute(trainingId);
    return training;
  }
}
