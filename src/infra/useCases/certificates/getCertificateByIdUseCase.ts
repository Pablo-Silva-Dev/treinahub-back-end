import { CertificatesImplementation } from "@/infra/repositories/implementations/certificatesImplementation";
import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class GetCertificateByIdUseCase {
  constructor(private certificatesImplementation: CertificatesImplementation) {}
  async execute(certificateId) {
    const certificate =
      await this.certificatesImplementation.getCertificateById(certificateId);
    if (!certificate) {
      throw new NotFoundException("Certificate not found");
    }
    return certificate;
  }
}
