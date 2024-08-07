import { ConflictException, Injectable } from "@nestjs/common";
import { hash } from "bcryptjs";
import { ICreateUserDTO } from "src/infra/dtos/UserDTO";
import { UsersImplementation } from "src/infra/repositories/implementations/usersImplementation";

@Injectable()
export class CreateUserUseCase {
  constructor(private usersImplementation: UsersImplementation) {}
  async execute(data: ICreateUserDTO) {
    const { cpf, email, phone, password, birth_date } = data;

    const PASSWORD_ENCRYPTION_SALT_LEVEL = 6;

    const userCpfAlreadyExists =
      await this.usersImplementation.getUserByCpf(cpf);
    const userEmailAlreadyExists =
      await this.usersImplementation.getUserByEmail(email);
    const userPhoneAlreadyExists =
      await this.usersImplementation.getUserById(phone);

    if (userEmailAlreadyExists || userCpfAlreadyExists) {
      throw new ConflictException(
        "An user with the same email or cpf provided already exists"
      );
    }

    if (userPhoneAlreadyExists) {
      throw new ConflictException(
        "An user with the linked phone provided already exists"
      );
    }

    const encryptedPassword = await hash(
      password,
      PASSWORD_ENCRYPTION_SALT_LEVEL
    );

    const formattedDate = new Date(birth_date);

    const newUser = await this.usersImplementation.createUser({
      ...data,
      password: encryptedPassword,
      birth_date: formattedDate,
    });

    return newUser;
  }
}
