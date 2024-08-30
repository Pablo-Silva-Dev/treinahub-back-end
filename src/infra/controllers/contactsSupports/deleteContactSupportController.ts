import { DeleteContactsSupportUseCase } from "@/infra/useCases/contactsSupport/deleteContactSupportUseCase";
import {
  ConflictException,
  Controller,
  Delete,
  HttpCode,
  Param,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Controller("/contacts-support/delete")
@UseGuards(AuthGuard("jwt-admin"))
export class DeleteContactsSupportController {
  constructor(
    private deleteContactsSupportUseCase: DeleteContactsSupportUseCase
  ) {}
  @Delete(":contactsSupportId")
  @HttpCode(204)
  async handle(@Param("contactsSupportId") contactsSupportId: string) {
    if (!contactsSupportId) {
      throw new ConflictException("contactsSupportId is required");
    }
    try {
      await this.deleteContactsSupportUseCase.execute(contactsSupportId);
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
