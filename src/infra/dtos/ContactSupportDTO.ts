export interface IContactSupportDTO {
  contact_number: string;
  name: string;
}

export interface ICreateContactSupportDTO {
  contact_number: string;
  name: string;
}

export interface IUpdateContactSupportDTO {
  id: string;
  contact_number?: string;
  name?: string;
}
