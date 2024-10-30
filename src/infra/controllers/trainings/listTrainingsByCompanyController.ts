import {ListTrainingsByCompanyUseCase} from '@/infra/useCases/trainings/listTrainingsByCompanyUseCase'
import { secondsToFullTimeString } from "@/utils/convertTime";
import {
  ConflictException,
  Controller,
  Get,
  HttpCode,
  Param,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Controller("/trainings/list")
@UseGuards(AuthGuard("jwt-user"))
export class ListTrainingsByCompanyController {
  constructor(private ListTrainingsByCompanyUseCase: ListTrainingsByCompanyUseCase) {}
  @Get(":companyId")
  @HttpCode(200)
  async handle(@Param("companyId") companyId: string) {
    try {
      const trainings = await this.ListTrainingsByCompanyUseCase.execute(companyId);
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
