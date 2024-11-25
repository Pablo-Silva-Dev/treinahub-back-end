import {
  IContactSupportDTO,
  ICreateContactSupportDTO,
  IUpdateContactSupportDTO,
} from "@/infra/dtos/ContactSupportDTO";
import { PrismaService } from "@/infra/services/prisma";
import { Injectable } from "@nestjs/common";
import { IContactSupportRepository } from "../interfaces/contactsSupportRepository";

@Injectable()
export class ContactsSupportImplementation
  implements IContactSupportRepository
{
  constructor(private prisma: PrismaService) {}

  async createContactSupport(
    data: ICreateContactSupportDTO
  ): Promise<IContactSupportDTO> {
    const { contact_number, email, company_id } = data;

    const contactNumberAlreadyExists =
      await this.prisma.contactSupport.findFirst({
        where: {
          contact_number,
        },
      });

    const emailAlreadyExists = await this.prisma.contactSupport.findFirst({
      where: {
        email,
      },
    });

    const company = await this.prisma.company.findUnique({
      where: {
        id: company_id,
      },
    });

    if (contactNumberAlreadyExists || emailAlreadyExists || !company) {
      return null;
    }

    const newContactSupport = await this.prisma.contactSupport.create({
      data,
    } as never);
    return newContactSupport;
  }
  async listContactsSupport(companyId: string): Promise<IContactSupportDTO[]> {
    const contactsSupport = await this.prisma.contactSupport.findMany({
      where: {
        company_id: companyId,
      },
    });
    return contactsSupport;
  }
  async getContactSupportByNumber(
    contact_number: string
  ): Promise<IContactSupportDTO | void> {
    const contactsSupport = await this.prisma.contactSupport.findFirst({
      where: {
        contact_number,
      },
    });

    if (!contactsSupport) {
      return;
    }

    return contactsSupport;
  }

  async getContactSupportById(id: string): Promise<IContactSupportDTO | void> {
    const contactsSupport = await this.prisma.contactSupport.findUnique({
      where: {
        id,
      },
    });

    if (!contactsSupport) {
      return;
    }

    return contactsSupport;
  }

  async updateContactSupport(
    data: IUpdateContactSupportDTO
  ): Promise<IContactSupportDTO> {
    const { contact_number, id } = data;

    const contactAlreadyExists = await this.prisma.contactSupport.findFirst({
      where: {
        contact_number,
      },
    });

    const contact = await this.prisma.contactSupport.findUnique({
      where: {
        id,
      },
    });

    if (contactAlreadyExists || !contact) {
      return null;
    }
    const newContactSupport = await this.prisma.contactSupport.update({
      where: {
        id,
      },
      data,
    });
    return newContactSupport;
  }
  async deleteContactSupport(contactId: string) {
    const contactSupport = await this.prisma.contactSupport.findUnique({
      where: {
        id: contactId,
      },
    });

    if (!contactSupport) {
      return null;
    }

    await this.prisma.contactSupport.delete({
      where: {
        id: contactId,
      },
    });
  }
}
