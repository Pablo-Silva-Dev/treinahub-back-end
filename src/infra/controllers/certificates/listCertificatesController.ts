import { ListCertificatesUseCase } from "@/infra/useCases/certificates/listCertificatesUseCase";
import { ConflictException, Controller, Get, HttpCode } from "@nestjs/common";

@Controller("/certificates/list")
export class ListCertificatesController {
  constructor(private listCertificatesUseCase: ListCertificatesUseCase) {}
  @Get()
  @HttpCode(200)
  async handle() {
    try {
      const certificates = await this.listCertificatesUseCase.execute();
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
