import { ContactsSupportImplementation } from "@/infra/repositories/implementations/contactsSupportImplementation";
import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class GetContactSupportByIdUseCase {
  constructor(
    private contactsSupportsImplementation: ContactsSupportImplementation
  ) {}
  async execute(contactsSupportId) {
    const contactsSupport =
      await this.contactsSupportsImplementation.getContactSupportById(
        contactsSupportId
      );
    if (!contactsSupport) {
      throw new NotFoundException("Contact support not found");
    }
    return contactsSupport;
  }
}
