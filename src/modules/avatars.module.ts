import { CreateAvatarController } from "@/infra/controllers/avatars/createAvatarController";
import { GetAvatarByUserIdController } from "@/infra/controllers/avatars/getAvatarByUserIdController";
import { UpdateAvatarController } from "@/infra/controllers/avatars/updateAvatarController";
import { AvatarsImplementation } from "@/infra/repositories/implementations/avatarsImplementation";
import { UsersImplementation } from "@/infra/repositories/implementations/usersImplementation";
import { AzureBlobStorageService } from "@/infra/services/azureBlobStorageService";
import { ManageFileService } from "@/infra/services/manageFileService";
import { PrismaService } from "@/infra/services/prisma";
import { CreateAvatarUseCase } from "@/infra/useCases/avatars/createsAvatarUseCase";
import { GetAvatarByUserIdUseCase } from "@/infra/useCases/avatars/getAvatarByUserIdUseCase";
import { UpdateAvatarUseCase } from "@/infra/useCases/avatars/updateAvatarUseCase";
import { Module } from "@nestjs/common";

@Module({
  controllers: [
    CreateAvatarController,
    GetAvatarByUserIdController,
    UpdateAvatarController,
  ],
  providers: [
    PrismaService,
    AvatarsImplementation,
    ManageFileService,
    AzureBlobStorageService,
    UsersImplementation,
    CreateAvatarUseCase,
    GetAvatarByUserIdUseCase,
    UpdateAvatarUseCase,
  ],
})
export class AvatarsModule {}
