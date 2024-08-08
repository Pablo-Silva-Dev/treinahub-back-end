import { GetCertificateByIdUseCase } from "@/infra/useCases/certificates/getCertificateByIdUseCase";
import {
  ConflictException,
  Controller,
  Get,
  HttpCode,
  Param,
} from "@nestjs/common";
@Controller("/certificates/get-by-id")
export class GetCertificateByIdController {
  constructor(private getCertificateByIdUseCase: GetCertificateByIdUseCase) {}
  @Get(":certificateId")
  @HttpCode(200)
  async handle(@Param("certificateId") certificateId: string) {
    try {
      const certificate =
        await this.getCertificateByIdUseCase.execute(certificateId);
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
