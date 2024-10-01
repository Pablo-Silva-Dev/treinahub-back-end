import { CreateCertificateController } from "@/infra/controllers/certificates/createCertificateController";
import { GetCertificateByIdController } from "@/infra/controllers/certificates/getCertificateByIdController";
import { GetCertificateByUserAndTrainingController } from "@/infra/controllers/certificates/getCertificateByUserAndTrainingController";
import { ListCertificatesByTrainingController } from "@/infra/controllers/certificates/listCertificatesByTrainingController";
import { ListCertificatesByUserController } from "@/infra/controllers/certificates/listCertificatesByUserController";
import { ListCertificatesController } from "@/infra/controllers/certificates/listCertificatesController";
import { CertificatesImplementation } from "@/infra/repositories/implementations/certificatesImplementation";
import { TrainingsImplementation } from "@/infra/repositories/implementations/trainingsImplementation";
import { UsersImplementation } from "@/infra/repositories/implementations/usersImplementation";
import { AzureBlobStorageService } from "@/infra/services/azureBlobStorageService";
import { ManageFileService } from "@/infra/services/manageFileService";
import { PrismaService } from "@/infra/services/prisma";
import { CreateCertificateUseCase } from "@/infra/useCases/certificates/createCertificateUseCase";
import { GetCertificateByIdUseCase } from "@/infra/useCases/certificates/getCertificateByIdUseCase";
import { GetCertificateByUserAndTrainingUseCase } from "@/infra/useCases/certificates/getCertificateByUserAndTrainingUseCase";
import { ListCertificatesByTrainingUseCase } from "@/infra/useCases/certificates/listCertificatesByTrainingUseCase";
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
    ManageFileService,
    AzureBlobStorageService,
    CreateCertificateUseCase,
    ListCertificatesUseCase,
    ListCertificatesByUserUseCase,
    GetCertificateByIdUseCase,
    ListCertificatesByTrainingUseCase,
    GetUserByIdUseCase,
    GetTrainingByIdUseCase,
    GetCertificateByUserAndTrainingUseCase,
  ],
  controllers: [
    CreateCertificateController,
    ListCertificatesController,
    ListCertificatesByUserController,
    ListCertificatesByTrainingController,
    GetCertificateByIdController,
    GetCertificateByUserAndTrainingController,
  ],
})
export class CertificatesModule {}
