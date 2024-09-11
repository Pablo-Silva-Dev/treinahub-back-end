import {
  IAvatarDTO,
  ICreateAvatarDTO,
  IUpdateAvatarDTO,
} from "@/infra/dtos/AvatarDTO";

export interface IAvatarsRepository {
  createAvatar(data: ICreateAvatarDTO): Promise<IAvatarDTO>;
  getAvatarByUserId(userId: string): Promise<IAvatarDTO | void>;
  getAvatarById(id: string): Promise<IAvatarDTO | void>;
  deleteAvatarByUserId(userId: string): Promise<void>;
  updateAvatar(data: IUpdateAvatarDTO): Promise<IAvatarDTO | void>;
}
