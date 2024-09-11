import { CreateAvatarController } from "@/infra/controllers/avatars/createAvatarController";
import { DeleteUserAvatarController } from "@/infra/controllers/avatars/deleteUserAvatarController";
import { GetAvatarByIdController } from "@/infra/controllers/avatars/getAvatarByIController";
import { GetAvatarByUserIdController } from "@/infra/controllers/avatars/getAvatarByUserIdController";
import { UpdateAvatarController } from "@/infra/controllers/avatars/updateAvatarController";
import { AvatarsImplementation } from "@/infra/repositories/implementations/avatarsImplementation";
import { UsersImplementation } from "@/infra/repositories/implementations/usersImplementation";
import { AzureBlobStorageService } from "@/infra/services/azureBlobStorageService";
import { ManageFileService } from "@/infra/services/manageFileService";
import { PrismaService } from "@/infra/services/prisma";
import { CreateAvatarUseCase } from "@/infra/useCases/avatars/createsAvatarUseCase";
import { DeleteUserAvatarUseCase } from "@/infra/useCases/avatars/deleteUserAvatarUseCase";
import { GetAvatarByIdUseCase } from "@/infra/useCases/avatars/getAvatarByIdUseCase";
import { GetAvatarByUserIdUseCase } from "@/infra/useCases/avatars/getAvatarByUserIdUseCase";
import { UpdateAvatarUseCase } from "@/infra/useCases/avatars/updateAvatarUseCase";
import { GetUserByIdUseCase } from "@/infra/useCases/users/getUserByIdUseCase";
import { Module } from "@nestjs/common";

@Module({
  controllers: [
    CreateAvatarController,
    GetAvatarByUserIdController,
    GetAvatarByIdController,
    UpdateAvatarController,
    DeleteUserAvatarController,
  ],
  providers: [
    PrismaService,
    AvatarsImplementation,
    ManageFileService,
    AzureBlobStorageService,
    UsersImplementation,
    CreateAvatarUseCase,
    GetAvatarByUserIdUseCase,
    GetAvatarByIdUseCase,
    UpdateAvatarUseCase,
    DeleteUserAvatarUseCase,
    GetUserByIdUseCase,
  ],
})
export class AvatarsModule {}
