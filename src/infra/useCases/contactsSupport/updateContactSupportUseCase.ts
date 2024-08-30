import { IUpdateContactSupportDTO } from "@/infra/dtos/ContactSupportDTO";
import { ContactsSupportImplementation } from "@/infra/repositories/implementations/contactsSupportImplementation";
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";

@Injectable()
export class UpdateContactSupportUseCase {
  constructor(
    private contactSupportsImplementation: ContactsSupportImplementation
  ) {}
  async execute(data: IUpdateContactSupportDTO) {
    const { id, contact_number } = data;
    const contactSupport =
      await this.contactSupportsImplementation.getContactSupportById(id);

    const contactNumberAlreadyExists =
      await this.contactSupportsImplementation.getContactSupportByNumber(
        contact_number
      );

    if (!contactSupport) {
      throw new NotFoundException("Contact support number not found");
    }

    if (contactNumberAlreadyExists) {
      throw new ConflictException("Contact support number already exists");
    }

    const updatedContactSupport =
      await this.contactSupportsImplementation.updateContactSupport(data);
    return updatedContactSupport;
  }
}
