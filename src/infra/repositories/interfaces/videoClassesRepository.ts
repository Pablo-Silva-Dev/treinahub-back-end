import {
  ICreateVideoClassDTO,
  IUpdateVideoClassDTO,
  IVideoClassDTO,
} from "@/infra/dtos/VideoClassDTO";

export interface IVideoClassesRepository {
  createVideoClass(data: ICreateVideoClassDTO): Promise<IVideoClassDTO>;
  listVideoClasses(): Promise<IVideoClassDTO[]>;
  listVideoClassesByTraining(trainingId: string): Promise<IVideoClassDTO[]>;
  getVideoClassById(videoClassId: string): Promise<IVideoClassDTO | void>;
  getVideoClassByNameAndTrainingId(
    name: string,
    trainingId: string
  ): Promise<IVideoClassDTO | void>;
  getVideoClassByUrlAndTrainingId(
    url: string,
    trainingId: string
  ): Promise<IVideoClassDTO | void>;
  updateVideoClass(data: IUpdateVideoClassDTO): Promise<IVideoClassDTO>;
  deleteVideoClass(videoClassId: string): Promise<void>;
}
