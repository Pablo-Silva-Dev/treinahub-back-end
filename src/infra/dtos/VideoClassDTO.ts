import { ITrainingDTO } from "./TrainingDTO";

export interface IVideoClassDTO {
  id: string;
  name: string;
  description: string;
  duration: number;
  url: string;
  thumbnail_url?: string;
  training_id: string;
  training: ITrainingDTO;
}
