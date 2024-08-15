import {
  ICreateWatchedClassesDTO,
  IRemoveWatchedClassDTO,
  IWatchedClassesDTO,
} from "@/infra/dtos/WatchedClassDTO";

export interface IWatchedClassesRepository {
  createWatchedClass(
    data: ICreateWatchedClassesDTO
  ): Promise<IWatchedClassesDTO>;
  listWatchedClasses(): Promise<IWatchedClassesDTO[]>;
  listWatchedClassesByUserIdAndTrainingId(
    user_id: string,
    training_id: string
  ): Promise<IWatchedClassesDTO[]>;
  getUniqueWatchedClass(
    userId: string,
    videoClassId: string
  ): Promise<IWatchedClassesDTO | void>;
  removeWatchedClass(data: IRemoveWatchedClassDTO): Promise<void>;
}
