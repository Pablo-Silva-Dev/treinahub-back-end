import { ListContactsSupportUseCase } from "@/infra/useCases/contactsSupport/listContactsSupportUseCase";
import { ConflictException, Controller, Get, HttpCode } from "@nestjs/common";

@Controller("/contacts-support/list")
export class ListContactSupportsController {
  constructor(private listContactSupportsUseCase: ListContactsSupportUseCase) {}
  @Get()
  @HttpCode(200)
  async handle() {
    try {
      const contactSupports = await this.listContactSupportsUseCase.execute();
      return contactSupports;
    } catch (error) {
      console.log("[INTERNAL ERROR]", error.message);
      throw new ConflictException({
        message: "An error occurred.",
        error: error.message,
      });
    }
  }
}
