import { CreateCertificateController } from "@/infra/controllers/certificates/createCertificateController";
import { GetCertificateByIdController } from "@/infra/controllers/certificates/getCertificateByIdController";
import { ListCertificatesByUserController } from "@/infra/controllers/certificates/listCertificatesByUserController";
import { ListCertificatesController } from "@/infra/controllers/certificates/listCertificatesController";
import { CertificatesImplementation } from "@/infra/repositories/implementations/certificatesImplementation";
import { TrainingsImplementation } from "@/infra/repositories/implementations/trainingsImplementation";
import { UsersImplementation } from "@/infra/repositories/implementations/usersImplementation";
import { AzureBlobStorageService } from "@/infra/services/azureBlobStorageService";
import { ManageCertificateFileService } from "@/infra/services/manageCertificateFileService";
import { PrismaService } from "@/infra/services/prisma";
import { CreateCertificateUseCase } from "@/infra/useCases/certificates/createCertificateUseCase";
import { GetCertificateByIdUseCase } from "@/infra/useCases/certificates/getCertificateByIdUseCase";
import { ListCertificatesByUserUseCase } from "@/infra/useCases/certificates/listCertificatesByUserUseCase";
import { ListCertificatesUseCase } from "@/infra/useCases/certificates/listCertificatesUseCase";
import { GetTrainingByIdUseCase } from "@/infra/useCases/trainings/getTrainingByIdUseCase";
import { GetUserByIdUseCase } from "@/infra/useCases/users/getUserByIdUseCase";
import { Module } from "@nestjs/common";

@Module({
  providers: [
    PrismaService,
    CertificatesImplementation,
    UsersImplementation,
    TrainingsImplementation,
    ManageCertificateFileService,
    AzureBlobStorageService,
    CreateCertificateUseCase,
    ListCertificatesUseCase,
    ListCertificatesByUserUseCase,
    GetCertificateByIdUseCase,
    GetUserByIdUseCase,
    GetTrainingByIdUseCase,
  ],
  controllers: [
    CreateCertificateController,
    ListCertificatesController,
    ListCertificatesByUserController,
    GetCertificateByIdController,
  ],
})
export class CertificatesModule {}
