import { IGetCertificateByUserAndTrainingDTO } from "@/infra/dtos/CertificateDTO";
import { CertificatesImplementation } from "@/infra/repositories/implementations/certificatesImplementation";
import { TrainingsImplementation } from "@/infra/repositories/implementations/trainingsImplementation";
import { UsersImplementation } from "@/infra/repositories/implementations/usersImplementation";
import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class GetCertificateByUserAndTrainingUseCase {
  constructor(
    private certificatesImplementation: CertificatesImplementation,
    private usersImplementation: UsersImplementation,
    private trainingsImplementation: TrainingsImplementation
  ) {}

  async execute(data: IGetCertificateByUserAndTrainingDTO) {
    const { user_id, training_id } = data;

    const user = await this.usersImplementation.getUserById(user_id);

    if (!user) {
      throw new NotFoundException("User not found");
    }

    const training =
      await this.trainingsImplementation.getTrainingById(training_id);

    if (!training) {
      throw new NotFoundException("Training not found");
    }

    const certificate =
      await this.certificatesImplementation.getCertificateByUserAndTraining(
        data
      );
    if (!certificate) {
      return null;
    }
    return certificate;
  }
}
