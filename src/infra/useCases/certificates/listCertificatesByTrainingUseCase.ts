import { CertificatesImplementation } from "@/infra/repositories/implementations/certificatesImplementation";
import { TrainingsImplementation } from "@/infra/repositories/implementations/trainingsImplementation";
import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class ListCertificatesByTrainingUseCase {
  constructor(
    private certificatesImplementation: CertificatesImplementation,
    private trainingsImplementation: TrainingsImplementation
  ) {}
  async execute(trainingId) {
    const training =
      await this.trainingsImplementation.getTrainingById(trainingId);

    if (!training) {
      throw new NotFoundException("Training not found");
    }

    const certificates =
      await this.certificatesImplementation.listCertificatesByTraining(
        trainingId
      );
    return certificates;
  }
}
