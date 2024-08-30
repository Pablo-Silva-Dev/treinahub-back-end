import { CreateContactSupportController } from "@/infra/controllers/contactsSupports/createContactSupportController";
import { DeleteContactsSupportController } from "@/infra/controllers/contactsSupports/deleteContactSupportController";
import { GetContactSupportByIdController } from "@/infra/controllers/contactsSupports/getContactSupportByIdController";
import { ListContactSupportsController } from "@/infra/controllers/contactsSupports/listContactSupportController";
import { UpdateContactSupportController } from "@/infra/controllers/contactsSupports/updateContactSupportController";
import { ContactsSupportImplementation } from "@/infra/repositories/implementations/contactsSupportImplementation";
import { PrismaService } from "@/infra/services/prisma";
import { CreateContactSupportUseCase } from "@/infra/useCases/contactsSupport/createContactSupportUseCase";
import { DeleteContactsSupportUseCase } from "@/infra/useCases/contactsSupport/deleteContactSupportUseCase";
import { GetContactSupportByIdUseCase } from "@/infra/useCases/contactsSupport/getContactSupportByIdUseCase";
import { ListContactsSupportUseCase } from "@/infra/useCases/contactsSupport/listContactsSupportUseCase";
import { UpdateContactSupportUseCase } from "@/infra/useCases/contactsSupport/updateContactSupportUseCase";
import { Module } from "@nestjs/common";

@Module({
  providers: [
    PrismaService,
    ContactsSupportImplementation,
    CreateContactSupportUseCase,
    ListContactsSupportUseCase,
    UpdateContactSupportUseCase,
    DeleteContactsSupportUseCase,
    GetContactSupportByIdUseCase,
  ],
  controllers: [
    CreateContactSupportController,
    ListContactSupportsController,
    UpdateContactSupportController,
    DeleteContactsSupportController,
    GetContactSupportByIdController,
  ],
})
export class ContactsSupportModule {}
