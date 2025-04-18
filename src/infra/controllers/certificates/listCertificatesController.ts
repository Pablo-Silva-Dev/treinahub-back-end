import { ListCertificatesUseCase } from "@/infra/useCases/certificates/listCertificatesUseCase";
import {
  ConflictException,
  Controller,
  Get,
  HttpCode,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Controller("/certificates/list")
@UseGuards(AuthGuard("jwt-admin"))
export class ListCertificatesController {
  constructor(private listCertificatesUseCase: ListCertificatesUseCase) {}
  @Get()
  @HttpCode(200)
  async handle() {
    try {
      const certificates = await this.listCertificatesUseCase.execute();
      const completeCertificates = certificates.map((cert) => {
        if (cert.training) {
          return {
            ...cert,
            training_name: cert.training.name,
          };
        }
        if (cert.user) {
          return {
            ...cert,
            user_name: cert.user.name,
          };
        }
      });
      return completeCertificates;
    } catch (error) {
      console.log("[INTERNAL ERROR]", error.message);
      throw new ConflictException({
        message: "An error occurred.",
        error: error.message,
      });
    }
  }
}
