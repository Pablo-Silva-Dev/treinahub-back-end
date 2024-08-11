import { ContactsSupportImplementation } from "@/infra/repositories/implementations/contactsSupportImplementation";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ListContactsSupportUseCase {
  constructor(
    private contactsSupportImplementation: ContactsSupportImplementation
  ) {}
  async execute() {
    const contactsSupports =
      await this.contactsSupportImplementation.listContactsSupport();
    return contactsSupports;
  }
}
