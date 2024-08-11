import { IUpdateContactSupportDTO } from "@/infra/dtos/ContactSupportDTO";
import { ContactsSupportImplementation } from "@/infra/repositories/implementations/contactsSupportImplementation";
import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class UpdateContactSupportUseCase {
  constructor(
    private contactSupportsImplementation: ContactsSupportImplementation
  ) {}
  async execute(data: IUpdateContactSupportDTO) {
    const { id } = data;
    const contactSupport =
      await this.contactSupportsImplementation.getContactSupportById(id);

    if (!contactSupport) {
      throw new NotFoundException("Contact support number not found");
    }

    const updatedContactSupport =
      await this.contactSupportsImplementation.updateContactSupport(data);
    return updatedContactSupport;
  }
}
