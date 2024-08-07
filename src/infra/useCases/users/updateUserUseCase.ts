import { IUpdateUserDTO } from "@/infra/dtos/UserDTO";
import { UsersImplementation } from "@/infra/repositories/implementations/usersImplementation";
import { cepValidationRegex, phoneValidationRegex } from "@/utils/regex";
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { hash } from "bcryptjs";
import { z } from "zod";

const updateUserBodySchema = z.object({
  password: z.string().min(8).optional(),
  cep: z.string().regex(cepValidationRegex).optional(),
  street: z.string().optional(),
  district: z.string().optional(),
  city: z.string().optional(),
  uf: z.string().optional(),
  residence_number: z.string().optional(),
  phone: z.string().regex(phoneValidationRegex).optional(),
});

@Injectable()
export class UpdateUserUseCase {
  constructor(private usersImplementation: UsersImplementation) {}
  async execute(id: string, data: IUpdateUserDTO) {
    const isBodyValidated = updateUserBodySchema.safeParse(data);

    const PASSWORD_ENCRYPTION_SALT_LEVEL = 6;

    if (!isBodyValidated.success) {
      throw new ConflictException({
        message: "Invalid update",
        error: isBodyValidated.error.issues,
      });
    }

    const user = await this.usersImplementation.getUserById(id);
    if (!user) {
      throw new NotFoundException("User not found");
    }

    const { password } = data;

    const encryptedPassword = await hash(
      password,
      PASSWORD_ENCRYPTION_SALT_LEVEL
    );

    await this.usersImplementation.updateUser({
      ...data,
      password: encryptedPassword,
    });
  }
}
