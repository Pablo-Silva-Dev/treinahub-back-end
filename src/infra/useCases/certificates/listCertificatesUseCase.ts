import { CertificatesImplementation } from "@/infra/repositories/implementations/certificatesImplementation";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ListCertificatesUseCase {
  constructor(private certificatesImplementation: CertificatesImplementation) {}
  async execute() {
    const certificates =
      await this.certificatesImplementation.listCertificates();
    return certificates;
  }
}
