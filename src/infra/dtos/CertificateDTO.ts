import { ITrainingDTO } from "./TrainingDTO";
import { IUserDTO } from "./UserDTO";

export interface ICertificateDTO {
  id: string;
  user_id: string;
  training_id: string;
  url: string;
  created_at: Date;
  user?: IUserDTO;
  training?: ITrainingDTO;
}

export interface ICreateCertificateDTO {
  user_id: string;
  training_id: string;
  url: string;
}

export interface IGetCertificateByUserAndTrainingDTO {
  user_id: string;
  training_id: string;
}

export interface IGenerateCertificateDTO {
  user: IUserDTO;
  training: ITrainingDTO;
}
