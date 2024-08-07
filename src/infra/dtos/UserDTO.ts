import { ICertificateDTO } from "./CertificateDTO";
import { ITrainingDTO } from "./TrainingDTO";
import { ITrainingMetricsDTO } from "./TrainingMetricDTO";
import { IWatchedClassesDTO } from "./WatchedClassDTO";

export interface IUserDTO {
  id: string;
  name: string;
  cpf: string;
  email: string;
  phone: string;
  cep?: string;
  street?: string;
  district?: string;
  city?: string;
  uf?: string;
  residence_number?: string;
  is_admin: boolean;
  trainings: ITrainingDTO[];
  certificates: ICertificateDTO[];
  watched_classes: IWatchedClassesDTO[];
  training_metrics: ITrainingMetricsDTO[];
}
