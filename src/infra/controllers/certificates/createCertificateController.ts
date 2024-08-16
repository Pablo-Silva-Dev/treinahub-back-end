import { ICreateCertificateDTO } from "@/infra/dtos/CertificateDTO";
import { CreateCertificateUseCase } from "@/infra/useCases/certificates/createCertificateUseCase";
import { formatSlug } from "@/utils/formatSlug";
import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
  UseGuards,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { AuthGuard } from "@nestjs/passport";
import { TEnvSchema } from "env";
import * as fs from "fs";
import { z } from "zod";
import { ManageFileService } from "../../services/manageFileService";
import { GetTrainingByIdUseCase } from "./../../useCases/trainings/getTrainingByIdUseCase";
import { GetUserByIdUseCase } from "./../../useCases/users/getUserByIdUseCase";

const createCertificateValidationSchema = z.object({
  user_id: z.string(),
  training_id: z.string(),
});

@Controller("/certificates/create")
@UseGuards(AuthGuard("jwt-user"))
export class CreateCertificateController {
  constructor(
    private createCertificateUseCase: CreateCertificateUseCase,
    private getUserByIdUseCase: GetUserByIdUseCase,
    private getTrainingByIdUseCase: GetTrainingByIdUseCase,
    private manageCertificateFileService: ManageFileService,
    private configService: ConfigService<TEnvSchema, true>
  ) {}
  @Post()
  @HttpCode(201)
  async handle(@Body() body: ICreateCertificateDTO) {
    const isBodyValidated = createCertificateValidationSchema.safeParse(body);
    if (!isBodyValidated.success) {
      throw new BadRequestException({
        message: "Invalid request body. Please check the input fields.",
        error: isBodyValidated.error.issues,
      });
    }

    try {
      const { user_id, training_id } = body;

      const blobStorageContainerName = this.configService.get(
        "AZURE_BLOB_STORAGE_CERTIFICATES_CONTAINER_NAME",
        { infer: true }
      );

      const user = await this.getUserByIdUseCase.execute(user_id);
      const training = await this.getTrainingByIdUseCase.execute(training_id);

      const certificate =
        await this.manageCertificateFileService.generateCertificate({
          user,
          training,
        });

      const certificateFile = fs.readFileSync(certificate);

      const userName = user.name;
      const trainingName = training.name;

      const certificateName = `${formatSlug(trainingName + "-" + userName)}-certificado.png`;

      const uploadedCertificate =
        await this.manageCertificateFileService.uploadFile(
          certificateFile,
          certificateName,
          blobStorageContainerName
        );

      fs.unlink(certificate, (err) => {
        if (err) {
          console.log("Error at trying to remove certificate file: ", err);
        } else {
          console.log("Local file removed successfully");
        }
      });

      const newCertificate = await this.createCertificateUseCase.execute({
        ...body,
        url: uploadedCertificate,
      });
      return newCertificate;
    } catch (error) {
      console.log("[INTERNAL ERROR]", error.message);
      throw new ConflictException({
        message:
          "An error occurred. Check all request body fields for possible mismatching.",
        error: error.message,
      });
    }
  }
}
