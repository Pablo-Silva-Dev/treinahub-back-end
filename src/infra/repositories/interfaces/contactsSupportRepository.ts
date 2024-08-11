import {
  IContactSupportDTO,
  ICreateContactSupportDTO,
  IUpdateContactSupportDTO,
} from "@/infra/dtos/ContactSupportDTO";

export interface IContactSupportRepository {
  createContactSupport(
    data: ICreateContactSupportDTO
  ): Promise<IContactSupportDTO>;
  listContactsSupport(): Promise<IContactSupportDTO[]>;
  getContactSupportByNumber(
    contact_number: string
  ): Promise<IContactSupportDTO | void>;
  updateContactSupport(
    data: IUpdateContactSupportDTO
  ): Promise<IContactSupportDTO>;
}
