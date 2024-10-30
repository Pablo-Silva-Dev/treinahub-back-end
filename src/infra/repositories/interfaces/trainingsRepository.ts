import {
  ICreateTrainingDTO,
  ITrainingDTO,
  IUpdateTrainingDTO,
} from "@/infra/dtos/TrainingDTO";

export interface ITrainingsRepository {
  createTraining(data: ICreateTrainingDTO): Promise<ITrainingDTO>;
  listTrainings(companyId: string): Promise<ITrainingDTO[] | []>;
  getTrainingById(id: string): Promise<ITrainingDTO | void>;
  getTrainingByName(id: string): Promise<ITrainingDTO | void>;
  updateTraining(data: IUpdateTrainingDTO): Promise<ITrainingDTO | void>;
  deleteTraining(id: string): Promise<void>;
}
