export interface IRecoveryCodeDTO {
  id: string;
  code: string;
  user_id: string;
  created_at: Date;
  expiration_date: Date;
}

export interface IValidateRecoveryCodeDTO {
  user_id: string;
  code: string;
}
