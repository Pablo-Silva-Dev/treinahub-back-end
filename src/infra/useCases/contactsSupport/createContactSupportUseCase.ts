import { ICreateContactSupportDTO } from "@/infra/dtos/ContactSupportDTO";
import { ContactsSupportImplementation } from "@/infra/repositories/implementations/contactsSupportImplementation";
import { ConflictException, Injectable } from "@nestjs/common";

@Injectable()
export class CreateContactSupportUseCase {
  constructor(
    private contactSupportsImplementation: ContactsSupportImplementation
  ) {}
  async execute(data: ICreateContactSupportDTO) {
    const { contact_number } = data;

    const contactAlreadyExists =
      await this.contactSupportsImplementation.getContactSupportByNumber(
        contact_number
      );

    if (contactAlreadyExists) {
      throw new ConflictException(
        "ContactSupport already exists for this user and training"
      );
    }

    const newContactSupport =
      await this.contactSupportsImplementation.createContactSupport(data);
    return newContactSupport;
  }
}
