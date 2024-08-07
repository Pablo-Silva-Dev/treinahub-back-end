import { DeleteTrainingUseCase } from "@/infra/useCases/trainings/deleteTrainingUseCase";
import {
  ConflictException,
  Controller,
  Delete,
  HttpCode,
  Param,
} from "@nestjs/common";

@Controller("trainings/delete")
export class DeleteTrainingController {
  constructor(private deleteTrainingUseCase: DeleteTrainingUseCase) {}
  @Delete(":trainingId")
  @HttpCode(204)
  async handle(@Param("trainingId") trainingId: string) {
    if (!trainingId) {
      throw new ConflictException("trainingId is required");
    }
    await this.deleteTrainingUseCase.execute(trainingId);
  }
}
