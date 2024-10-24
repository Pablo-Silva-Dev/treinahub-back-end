import {
  ICertificateDTO,
  ICreateCertificateDTO,
  IGetCertificateByUserAndTrainingDTO,
} from "@/infra/dtos/CertificateDTO";

export interface ICertificatesRepository {
  createCertificate(data: ICreateCertificateDTO): Promise<ICertificateDTO>;
  listCertificates(): Promise<ICertificateDTO[]>;
  listCertificatesByUser(userId: string): Promise<ICertificateDTO[]>;
  getCertificateById(certificateId: string): Promise<ICertificateDTO>;
  getCertificateByUserAndTraining(
    data: IGetCertificateByUserAndTrainingDTO
  ): Promise<ICertificateDTO>;
}
