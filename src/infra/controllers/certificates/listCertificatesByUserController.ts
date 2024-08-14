import { ListCertificatesByUserUseCase } from "@/infra/useCases/certificates/listCertificatesByUserUseCase";
import {
  ConflictException,
  Controller,
  Get,
  HttpCode,
  Param,
} from "@nestjs/common";

@Controller("/certificates/list-by-user")
export class ListCertificatesByUserController {
  constructor(
    private listCertificatesByUserUseCase: ListCertificatesByUserUseCase
  ) {}
  @Get(":userId")
  @HttpCode(200)
  async handle(@Param("userId") userId: string) {
    try {
      const certificates =
        await this.listCertificatesByUserUseCase.execute(userId);
      return certificates;
    } catch (error) {
      console.log("[INTERNAL ERROR]", error.message);
      throw new ConflictException({
        message:
          "An error occurred.",
        error: error.message,
      });
    }
  }
}