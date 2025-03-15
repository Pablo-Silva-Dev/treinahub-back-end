import { ICreateUserDTO } from "@/infra/dtos/UserDTO";
import { CompaniesImplementation } from "@/infra/repositories/implementations/companiesImplementation";
import { UsersImplementation } from "@/infra/repositories/implementations/usersImplementation";
import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { hash } from "bcryptjs";

@Injectable()
export class CreateUserUseCase {
  constructor(
    private usersImplementation: UsersImplementation,
    private companiesImplementation: CompaniesImplementation
  ) {}
  async execute(data: ICreateUserDTO) {
    const { cpf, email, phone, password, birth_date, company_id } = data;

    const company = await this.companiesImplementation.getCompany(company_id);

    if (!company) {
      throw new NotFoundException("Company not found");
    }

    if (company.current_plan === null) {
      throw new ForbiddenException("Company has no plan associated");
    }

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
