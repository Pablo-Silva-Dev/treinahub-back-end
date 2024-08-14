import {
  IRecoveryCodeDTO,
  IValidateRecoveryCodeDTO,
} from "@/infra/dtos/RecoveryCodeDTO";

export interface IRecoveriesCodeRepository {
  validateRecoveryCode(data: IValidateRecoveryCodeDTO): Promise<boolean>;
  getRecoveryCodeByCode(code: string): Promise<IRecoveryCodeDTO | void>;
}
