import { IRecoveryCodeDTO } from "@/infra/dtos/RecoveryCodeDTO";
import {
  ICreateUserDTO,
  IGetRecoveryPasswordCodeByEmailDTO,
  IGetRecoveryPasswordCodeBySMSDTO,
  IUpdateUserDTO,
  IUserDTO,
} from "@/infra/dtos/UserDTO";

export interface IUsersRepository {
  createUser(data: ICreateUserDTO): Promise<IUserDTO>;
  listUsers(): Promise<IUserDTO[] | []>;
  getUserByEmail(email: string): Promise<IUserDTO | void>;
  getUserByCpf(cpf: string): Promise<IUserDTO | void>;
  getUserById(id: string): Promise<IUserDTO | void>;
  getUserBySMS(phone: string): Promise<IUserDTO | void>;
  updateUser(data: IUpdateUserDTO): Promise<IUserDTO | void>;
  deleteUser(id: string): Promise<void>;
  getRecoveryPasswordCodeByEmail(
    data: IGetRecoveryPasswordCodeByEmailDTO
  ): Promise<IRecoveryCodeDTO>;
  getRecoveryPasswordCodeBySMS(
    data: IGetRecoveryPasswordCodeBySMSDTO
  ): Promise<IRecoveryCodeDTO>;
}
