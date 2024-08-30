import { ContactsSupportImplementation } from "@/infra/repositories/implementations/contactsSupportImplementation";
import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class DeleteContactsSupportUseCase {
  constructor(
    private contactsSupportImplementation: ContactsSupportImplementation
  ) {}
  async execute(id: string) {
    const contactsSupport =
      await this.contactsSupportImplementation.getContactSupportById(id);
    if (!contactsSupport) {
      throw new NotFoundException("Contact support not found");
    }
    await this.contactsSupportImplementation.deleteContactSupport(id);
  }
}
