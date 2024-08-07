import {
    ICreateTrainingDTO,
    IUpdateTrainingDTO,
    ITrainingDTO,
  } from "@/infra/dtos/TrainingDTO";
  
  export interface ITrainingsRepository {
    createTraining(data: ICreateTrainingDTO): Promise<ITrainingDTO>;
    listTrainings(): Promise<ITrainingDTO[] | []>;
    getTrainingById(id: string): Promise<ITrainingDTO | void>;
    getTrainingByName(id: string): Promise<ITrainingDTO | void>;
    updateTraining(data: IUpdateTrainingDTO): Promise<ITrainingDTO | void>;
    deleteTraining(id: string): Promise<void>;
  }