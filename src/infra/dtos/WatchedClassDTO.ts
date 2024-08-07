import { IUserDTO } from "./UserDTO";

export interface IWatchedClassesDTO {
  user_id: string;
  videoclass_id: string;
  watchedAt: Date;
  user?: IUserDTO;
}
