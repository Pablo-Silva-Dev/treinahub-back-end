import { CertificatesImplementation } from "@/infra/repositories/implementations/certificatesImplementation";
import { UsersImplementation } from "@/infra/repositories/implementations/usersImplementation";
import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class ListCertificatesByUserUseCase {
  constructor(
    private certificatesImplementation: CertificatesImplementation,
    private usersImplementation: UsersImplementation
  ) {}
  async execute(userId) {
    const user = await this.usersImplementation.getUserById(userId);

    if (!user) {
      throw new NotFoundException("User not found");
    }

    const certificates =
      await this.certificatesImplementation.listCertificatesByUser(userId);
    return certificates;
  }
}
