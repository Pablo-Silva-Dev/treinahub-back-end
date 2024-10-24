import { ListQuizzesResultsByUserUseCase } from "@/infra/useCases/quizResults/listQuizzesResultsByUserUseCase";
import {
  ConflictException,
  Controller,
  Get,
  HttpCode,
  Param,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Controller("/quizzes-results/list-by-user")
@UseGuards(AuthGuard("jwt-user"))
export class ListQuizzesResultsByUserController {
  constructor(
    private listQuizzesResultsByUserUseCase: ListQuizzesResultsByUserUseCase
  ) {}
  @Get(":userId")
  @HttpCode(200)
  async handle(@Param("userId") userId: string) {
    try {
      const quizzesResults =
        await this.listQuizzesResultsByUserUseCase.execute(userId);
      return quizzesResults;
    } catch (error) {
      console.log("[INTERNAL ERROR]", error.message);
      throw new ConflictException({
        message: "An error occurred.",
        error: error.message,
      });
    }
  }
}
