import { IGetCertificateByUserAndTrainingDTO } from "@/infra/dtos/CertificateDTO";
import { GetCertificateByUserAndTrainingUseCase } from "@/infra/useCases/certificates/getCertificateByUserAndTrainingUseCase";
import {
    BadRequestException,
    Body,
    ConflictException,
    Controller,
    HttpCode,
    Post,
    UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { z } from "zod";

const getCertificateBodySchema = z.object({
  user_id: z.string(),
  training_id: z.string(),
});
@Controller("/certificates/get-by-user-and-training")
@UseGuards(AuthGuard("jwt-user"))
export class GetCertificateByUserAndTrainingController {
  constructor(
    private getCertificateByUserAndTrainingUseCase: GetCertificateByUserAndTrainingUseCase
  ) {}
  @Post()
  @HttpCode(200)
  async handle(@Body() body: IGetCertificateByUserAndTrainingDTO) {
    const isBodyValidated = getCertificateBodySchema.safeParse(body);
    if (!isBodyValidated.success) {
      throw new BadRequestException({
        message: "Invalid request body. Please check the input fields.",
        error: isBodyValidated.error.issues,
      });
    }
    try {
      const certificate =
        await this.getCertificateByUserAndTrainingUseCase.execute(body);
      return certificate;
    } catch (error) {
      console.log("[INTERNAL ERROR]", error.message);
      throw new ConflictException({
        message: "An error occurred.",
        error: error.message,
      });
    }
  }
}
