import { ICreateCertificateDTO } from "@/infra/dtos/CertificateDTO";
import { CertificatesImplementation } from "@/infra/repositories/implementations/certificatesImplementation";
import { TrainingsImplementation } from "@/infra/repositories/implementations/trainingsImplementation";
import { UsersImplementation } from "@/infra/repositories/implementations/usersImplementation";
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";

@Injectable()
export class CreateCertificateUseCase {
  constructor(
    private certificatesImplementation: CertificatesImplementation,
    private usersImplementation: UsersImplementation,
    private trainingsImplementation: TrainingsImplementation
  ) {}
  async execute(data: ICreateCertificateDTO) {
    const { training_id, user_id } = data;

    const user = await this.usersImplementation.getUserById(user_id);
    const training =
      await this.trainingsImplementation.getTrainingById(training_id);

    if (!user) {
      throw new NotFoundException("User not found");
    }

    if (!training) {
      throw new NotFoundException("Training not found");
    }

    const certificateAlreadyExists =
      await this.certificatesImplementation.getCertificateByUserAndTraining({
        user_id,
        training_id,
      });

    if (certificateAlreadyExists) {
      throw new ConflictException(
        "Certificate already exists for this user and training"
      );
    }

    const newCertificate =
      await this.certificatesImplementation.createCertificate(data);
    return newCertificate;
  }
}
