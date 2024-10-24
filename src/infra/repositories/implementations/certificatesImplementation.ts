import {
  ICertificateDTO,
  ICreateCertificateDTO,
  IGetCertificateByUserAndTrainingDTO,
} from "@/infra/dtos/CertificateDTO";
import { ICertificatesRepository } from "@/infra/repositories/interfaces/certificatesRepository";
import { PrismaService } from "@/infra/services/prisma";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CertificatesImplementation implements ICertificatesRepository {
  constructor(private prisma: PrismaService) {}

  async createCertificate(
    data: ICreateCertificateDTO
  ): Promise<ICertificateDTO> {
    const { user_id, training_id } = data;

    const user = await this.prisma.user.findUnique({
      where: {
        id: user_id,
      },
    });

    const training = await this.prisma.training.findUnique({
      where: {
        id: training_id,
      },
    });

    const certificateForUserWithTrainingAlreadyExists =
      await this.prisma.certificate.findFirst({
        where: {
          training_id,
          user_id,
        },
      });

    if (!user || !training || certificateForUserWithTrainingAlreadyExists) {
      return;
    }

    const newCertificate = await this.prisma.certificate.create({ data });
    return newCertificate;
  }
  async listCertificates(): Promise<ICertificateDTO[]> {
    const certificates = await this.prisma.certificate.findMany({
      include: { user: true, training: true },
    });
    return certificates;
  }
  async listCertificatesByUser(userId: string): Promise<ICertificateDTO[]> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return;
    }

    const certificates = await this.prisma.certificate.findMany({
      where: {
        user_id: userId,
      },
      include: { user: true, training: true },
    });
    return certificates;
  }
  async listCertificatesByTraining(
    trainingId: string
  ): Promise<ICertificateDTO[]> {
    const training = await this.prisma.training.findUnique({
      where: {
        id: trainingId,
      },
    });

    if (!training) {
      return;
    }

    const certificates = await this.prisma.certificate.findMany({
      where: {
        training_id: trainingId,
      },
      include: { user: true, training: true },
    });
    return certificates;
  }
  async getCertificateById(certificateId: string): Promise<ICertificateDTO> {
    const certificate = await this.prisma.certificate.findUnique({
      where: {
        id: certificateId,
      },
      include: {
        training: true,
      },
    });
    return certificate;
  }
  async getCertificateByUserAndTraining(
    data: IGetCertificateByUserAndTrainingDTO
  ): Promise<ICertificateDTO> {
    const { user_id, training_id } = data;
    const certificate = await this.prisma.certificate.findFirst({
      where: {
        user_id,
        training_id,
      },
    });
    return certificate;
  }
}
