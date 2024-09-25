import { GetQuizResponseByIdUseCase } from "@/infra/useCases/quizResponses/getQuizResponseByIdUseCase";
import {
  ConflictException,
  Controller,
  Get,
  HttpCode,
  Param,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Controller("/quizzes-responses/get-by-id")
@UseGuards(AuthGuard("jwt-user"))
export class GetQuizResponseByIdController {
  constructor(private getQuizResponseByIdUseCase: GetQuizResponseByIdUseCase) {}

  @Get(":quizResponseId")
  @HttpCode(200)
  async handle(@Param("quizResponseId") quizResponseId: string) {
    try {
      const quizResponse =
        await this.getQuizResponseByIdUseCase.execute(quizResponseId);
      return quizResponse;
    } catch (error) {
      console.error("[INTERNAL ERROR]", error.message);
      throw new ConflictException({
        message: "An error occurred while fetching the quiz response.",
        error: error.message,
      });
    }
  }
}
