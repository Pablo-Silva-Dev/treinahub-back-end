import { DeleteTrainingUseCase } from "@/infra/useCases/trainings/deleteTrainingUseCase";
import {
  ConflictException,
  Controller,
  Delete,
  HttpCode,
  Param,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Controller("trainings/delete")
@UseGuards(AuthGuard("jwt-admin"))
export class DeleteTrainingController {
  constructor(private deleteTrainingUseCase: DeleteTrainingUseCase) {}
  @Delete(":trainingId")
  @HttpCode(200)
  async handle(@Param("trainingId") trainingId: string) {
    if (!trainingId) {
      throw new ConflictException("trainingId is required");
    }
    try {
      await this.deleteTrainingUseCase.execute(trainingId);
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
