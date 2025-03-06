import { IListQuizAttemptsByUserAndQuizDTO } from "@/infra/dtos/QuizAttemptDTO";
import { ListQuizAttemptsByUserAndQuizUseCase } from "@/infra/useCases/quizAttempts/listQuizAttemptsByUserAndQuizUseCase";
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

const listQuizAttemptsByUserAndQuizValidationSchema = z.object({
  user_id: z.string(),
  quiz_id: z.string(),
});

@Controller("/quizzes-attempts/list-by-user-and-quiz")
@UseGuards(AuthGuard("jwt-user"))
export class ListQuizAttemptsByUserAndQuizController {
  constructor(
    private listQuizAttemptsByUserAndQuizUseCase: ListQuizAttemptsByUserAndQuizUseCase
  ) {}

  @Post()
  @HttpCode(200)
  async handle(@Body() body: IListQuizAttemptsByUserAndQuizDTO) {
    try {
      const isbodyValid =
        listQuizAttemptsByUserAndQuizValidationSchema.safeParse(body);
      if (!isbodyValid.success) {
        throw new ConflictException({
          message: "Invalid body",
          error: isbodyValid.error.errors,
        });
      }

      const quizAttempts =
        await this.listQuizAttemptsByUserAndQuizUseCase.execute(body);
      return quizAttempts;
    } catch (error) {
      console.error("[INTERNAL ERROR]", error.message);
      throw new ConflictException({
        message: "An error occurred while fetching quiz attempts for the user.",
        error: error.message,
      });
    }
  }
}
