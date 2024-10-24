import {
  ConflictException,
  Controller,
  Get,
  HttpCode,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ListQuizzesUseCase } from "../../useCases/quizzes/listQuizzesUseCase";

@Controller("/quizzes/list")
@UseGuards(AuthGuard("jwt-user"))
export class ListQuizzesController {
  constructor(private listQuizzesUseCase: ListQuizzesUseCase) {}
  @Get()
  @HttpCode(200)
  async handle() {
    try {
      const quizzes = await this.listQuizzesUseCase.execute();
      return quizzes;
    } catch (error) {
      console.log("[INTERNAL ERROR]", error.message);
      throw new ConflictException({
        message: "An error occurred.",
        error: error.message,
      });
    }
  }
}
