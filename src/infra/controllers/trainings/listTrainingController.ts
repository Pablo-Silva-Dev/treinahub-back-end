import { ListTrainingsUseCase } from "@/infra/useCases/trainings/listTrainingsUseCase";
import { secondsToFullTimeString } from "@/utils/convertTime";
import {
  ConflictException,
  Controller,
  Get,
  HttpCode,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Controller("/trainings/list")
@UseGuards(AuthGuard("jwt-user"))
export class ListTrainingsController {
  constructor(private listTrainingsUseCase: ListTrainingsUseCase) {}
  @Get()
  @HttpCode(200)
  async handle() {
    try {
      const trainings = await this.listTrainingsUseCase.execute();
      const completeData = trainings.map((t) => ({
        ...t,
        video_classes: t.video_classes.map((vc) => ({
          ...vc,
          formatted_duration: secondsToFullTimeString(vc.duration),
        })),
      }));
      return completeData;
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
//
