import { CreateContactSupportController } from "@/infra/controllers/contactsSupports/createContactSupportController";
import { ListContactSupportsController } from "@/infra/controllers/contactsSupports/listContactSupportController";
import { UpdateContactSupportController } from "@/infra/controllers/contactsSupports/updateContactSupportController";
import { ContactsSupportImplementation } from "@/infra/repositories/implementations/contactsSupportImplementation";
import { PrismaService } from "@/infra/services/prisma";
import { CreateContactSupportUseCase } from "@/infra/useCases/contactsSupport/createContactSupportUseCase";
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
  ],
  controllers: [
    CreateContactSupportController,
    ListContactSupportsController,
    UpdateContactSupportController,
  ],
})
export class ContactsSupportModule {}
