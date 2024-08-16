import { ITrainingDTO } from "./TrainingDTO";

export interface IVideoClassDTO {
  id: string;
  name: string;
  description: string;
  duration: number;
  url: string;
  thumbnail_url?: string;
  training_id: string;
  training?: ITrainingDTO;
  formatted_duration?: string;
}

export interface ICreateVideoClassDTO {
  name: string;
  description: string;
  duration: number;
  url: string;
  thumbnail_url: string;
  training_id: string;
}

export interface IUpdateVideoClassDTO {
  id: string;
  name?: string;
  description?: string;
  url?: string;
  thumbnail_url?: string;
  training_id?: string;
}