import { IUserDTO } from "./UserDTO";

export interface IWatchedClassesDTO {
  user_id: string;
  training_id: string;
  videoclass_id: string;
  watchedAt: Date;
  completely_watched: boolean;
  execution_time: number;
  user?: IUserDTO;
}

export interface ICreateWatchedClassesDTO {
  user_id: string;
  training_id: string;
  videoclass_id: string;
  completely_watched: boolean;
}

export interface IUpdateVideoClassExecutionStatusDTO {
  user_id: string;
  videoclass_id: string;
  completely_watched: boolean;
  execution_time: number;
}

export interface IGetWatchedClassesByUserAndTrainingDTO {
  user_id: string;
  training_id: string;
  videoclass_id: string;
}

export interface IRemoveWatchedClassDTO {
  user_id: string;
  videoclass_id: string;
}
