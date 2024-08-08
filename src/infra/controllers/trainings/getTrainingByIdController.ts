import {
  ConflictException,
  Controller,
  Get,
  HttpCode,
  Param,
} from "@nestjs/common";
import { GetTrainingByIdUseCase } from "../../useCases/trainings/getTrainingByIdUseCase";

@Controller("/trainings/get-by-id")
export class GetTrainingByIdController {
  constructor(private getTrainingByIdUseCase: GetTrainingByIdUseCase) {}
  @HttpCode(200)
  @Get(":trainingId")
  async handle(@Param("trainingId") trainingId: string) {
    try {
      const training = await this.getTrainingByIdUseCase.execute(trainingId);
      return training;
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
