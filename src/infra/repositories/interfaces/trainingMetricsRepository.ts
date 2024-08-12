import {
  ICreateITrainingMetricsDTO,
  ITrainingMetricsDTO,
  IUpdateITrainingMetricsDTO,
} from "@/infra/dtos/TrainingMetricDTO";

export interface ITrainingMetricsRepository {
  createTrainingMetrics(
    data: ICreateITrainingMetricsDTO
  ): Promise<ITrainingMetricsDTO>;
  listTrainingMetrics(): Promise<ITrainingMetricsDTO[]>;
  listTrainingMetricsByUser(user_id: string): Promise<ITrainingMetricsDTO[]>;
  getTrainingMetricsByTrainingAndUser(
    user_id: string,
    training_id: string
  ): Promise<ITrainingMetricsDTO | void>;
  getTrainingMetricsById(id: string): Promise<ITrainingMetricsDTO | void>;
  updateTrainingMetrics(
    data: IUpdateITrainingMetricsDTO
  ): Promise<ITrainingMetricsDTO | void>;
}
