import { ListCertificatesByTrainingUseCase } from "@/infra/useCases/certificates/listCertificatesByTrainingUseCase";
import {
  ConflictException,
  Controller,
  Get,
  HttpCode,
  Param,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Controller("/certificates/list-by-training")
@UseGuards(AuthGuard("jwt-admin"))
export class ListCertificatesByTrainingController {
  constructor(
    private listCertificatesByTrainingUseCase: ListCertificatesByTrainingUseCase
  ) {}
  @Get(":trainingId")
  @HttpCode(200)
  async handle(@Param("trainingId") trainingId: string) {
    try {
      const certificates =
        await this.listCertificatesByTrainingUseCase.execute(trainingId);
      return certificates;
    } catch (error) {
      console.log("[INTERNAL ERROR]", error.message);
      throw new ConflictException({
        message: "An error occurred.",
        error: error.message,
      });
    }
  }
}
