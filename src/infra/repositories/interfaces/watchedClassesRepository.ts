import {
  ICreateWatchedClassesDTO,
  IGetWatchedClassByUserAndVideoDTO,
  IRemoveWatchedClassDTO,
  IUpdateVideoClassExecutionStatusDTO,
  IWatchedClassesDTO,
} from "@/infra/dtos/WatchedClassDTO";

export interface IWatchedClassesRepository {
  createWatchedClass(
    data: ICreateWatchedClassesDTO
  ): Promise<IWatchedClassesDTO>;
  listWatchedClasses(): Promise<IWatchedClassesDTO[]>;
  listWatchedClassesByUser(userId: string): Promise<IWatchedClassesDTO[]>;
  listWatchedClassesByUserIdAndTrainingId(
    user_id: string,
    training_id: string
  ): Promise<IWatchedClassesDTO[]>;
  getUniqueWatchedClass(
    data: IGetWatchedClassByUserAndVideoDTO
  ): Promise<IWatchedClassesDTO | void>;
  removeWatchedClass(data: IRemoveWatchedClassDTO): Promise<void>;
  updateVideoClassExecutionStatus(
    data: IUpdateVideoClassExecutionStatusDTO
  ): Promise<IWatchedClassesDTO>;
}
