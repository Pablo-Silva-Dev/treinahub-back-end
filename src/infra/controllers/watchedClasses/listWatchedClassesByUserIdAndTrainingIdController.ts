import { IGetWatchedClassesByUserAndTrainingDTO } from "@/infra/dtos/WatchedClassDTO";
import { ListWatchedClassesByUserIdAndTrainingIdUseCase } from "@/infra/useCases/watchedClasses/listWatchedClassesByTrainingIdAndUserIdUseCase";
import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { z } from "zod";

const listWatchedClassesValidationSchema = z.object({
  user_id: z.string(),
  training_id: z.string(),
});

@Controller("watched-classes/list-by-user-and-training")
@UseGuards(AuthGuard("jwt-user"))
export class ListWatchedClassesByUserIdAndTrainingIdController {
  constructor(
    private listWatchedClassesByUserIdAndTrainingIdUseCase: ListWatchedClassesByUserIdAndTrainingIdUseCase
  ) {}
  @Post()
  @HttpCode(201)
  async handle(@Body() body: IGetWatchedClassesByUserAndTrainingDTO) {
    const { user_id, training_id } = body;

    const isBodyValidated = listWatchedClassesValidationSchema.safeParse(body);

    if (!isBodyValidated.success) {
      throw new ConflictException({
        message: "An error occurred.",
        error: isBodyValidated.error.issues,
      });
    }

    try {
      const watchedClasses =
        await this.listWatchedClassesByUserIdAndTrainingIdUseCase.execute(
          user_id,
          training_id
        );
      return watchedClasses;
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
