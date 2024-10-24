import { ListQuizAttemptsByUserUseCase } from "@/infra/useCases/quizAttempts/listQuizAttemptsByUserUseCase";
import {
  ConflictException,
  Controller,
  Get,
  HttpCode,
  Param,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Controller("/quizzes-attempts/list-by-user")
@UseGuards(AuthGuard("jwt-user"))
export class ListQuizAttemptsByUserController {
  constructor(
    private listQuizAttemptsByUserUseCase: ListQuizAttemptsByUserUseCase
  ) {}

  @Get(":userId")
  @HttpCode(200)
  async handle(@Param("userId") userId: string) {
    try {
      const quizAttempts =
        await this.listQuizAttemptsByUserUseCase.execute(userId);
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
