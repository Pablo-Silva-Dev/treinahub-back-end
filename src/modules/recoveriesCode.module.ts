import { ValidateRecoveryCodeController } from "@/infra/controllers/recoveriesCodes/validateRecoveryCodeController";
import { RecoveriesCodeImplementation } from "@/infra/repositories/implementations/recoveriesCodeImplementation";
import { UsersImplementation } from "@/infra/repositories/implementations/usersImplementation";
import { PrismaService } from "@/infra/services/prisma";
import { ValidateRecoveryCodeUseCase } from "@/infra/useCases/recoveriesCodes/validateRecoveryCodeUseCase";
import { Module } from "@nestjs/common";

@Module({
  providers: [
    PrismaService,
    RecoveriesCodeImplementation,
    UsersImplementation,
    ValidateRecoveryCodeUseCase,
  ],
  controllers: [ValidateRecoveryCodeController],
})
export class RecoveriesCodeModule {}
