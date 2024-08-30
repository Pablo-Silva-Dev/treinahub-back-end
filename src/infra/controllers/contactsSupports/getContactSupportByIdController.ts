import { GetContactSupportByIdUseCase } from "@/infra/useCases/contactsSupport/getContactSupportByIdUseCase";
import {
  ConflictException,
  Controller,
  Get,
  HttpCode,
  Param,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
@Controller("/contacts-support/get-by-id")
@UseGuards(AuthGuard("jwt-user"))
export class GetContactSupportByIdController {
  constructor(
    private getContactsSupportByIdUseCase: GetContactSupportByIdUseCase
  ) {}
  @Get(":contactsSupportId")
  @HttpCode(200)
  async handle(@Param("contactsSupportId") contactsSupportId: string) {
    try {
      const contactsSupport =
        await this.getContactsSupportByIdUseCase.execute(contactsSupportId);
      return contactsSupport;
    } catch (error) {
      console.log("[INTERNAL ERROR]", error.message);
      throw new ConflictException({
        message: "An error occurred.",
        error: error.message,
      });
    }
  }
}
