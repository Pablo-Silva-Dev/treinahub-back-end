import { CreateCertificateController } from "@/infra/controllers/certificates/createCertificateController";
import { GetCertificateByIdController } from "@/infra/controllers/certificates/getCertificateByIdController";
import { ListCertificatesByUserController } from "@/infra/controllers/certificates/listCertificatesByUserController";
import { ListCertificatesController } from "@/infra/controllers/certificates/listCertificatesController";
import { CertificatesImplementation } from "@/infra/repositories/implementations/certificatesImplementation";
import { TrainingsImplementation } from "@/infra/repositories/implementations/trainingsImplementation";
import { UsersImplementation } from "@/infra/repositories/implementations/usersImplementation";
import { PrismaService } from "@/infra/services/prisma";
import { CreateCertificateUseCase } from "@/infra/useCases/certificates/createCertificateUseCase";
import { GetCertificateByIdUseCase } from "@/infra/useCases/certificates/getCertificateByIdUseCase";
import { ListCertificatesByUserUseCase } from "@/infra/useCases/certificates/listCertificatesByUserUseCase";
import { ListCertificatesUseCase } from "@/infra/useCases/certificates/listCertificatesUseCase";
import { Module } from "@nestjs/common";

@Module({
  providers: [
    PrismaService,
    CertificatesImplementation,
    UsersImplementation,
    TrainingsImplementation,
    CreateCertificateUseCase,
    ListCertificatesUseCase,
    ListCertificatesByUserUseCase,
    GetCertificateByIdUseCase,
  ],
  controllers: [
    CreateCertificateController,
    ListCertificatesController,
    ListCertificatesByUserController,
    GetCertificateByIdController,
  ],
})
export class CertificatesModule {}
