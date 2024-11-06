import { ITrainingDTO } from "./TrainingDTO";

export interface IVideoClassDTO {
  id: string;
  name: string;
  description: string;
  duration: number;
  video_url?: string;
  training_id: string;
  training?: ITrainingDTO;
  formatted_duration?: string;
  status?: "CONVERTED" | "CONVERTING" | "FAILED";
}

export interface ICreateVideoClassDTO {
  name: string;
  description: string;
  duration: number;
  video_url: string;
  training_id: string;
  status?: "CONVERTED" | "CONVERTING" | "FAILED";
}

export interface IUpdateVideoClassDTO {
  id: string;
  name: string;
  description: string;
  duration: number;
  video_url?: string;
  training_id?: string;
}
