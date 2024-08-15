import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { createCanvas, loadImage, registerFont } from "canvas";
import * as fs from "fs";
import * as path from "path";

import { formatDateNow } from "@/utils/formatDate";
import { formatUserCertificateName } from "@/utils/formatUserCertificateName";
import { TEnvSchema } from "env";
import { IGenerateCertificateDTO } from "../dtos/CertificateDTO";
import { AzureBlobStorageService } from "./azureBlobStorageService";

@Injectable()
export class ManageFileService {
  constructor(
    private azureBlobStorageProvider: AzureBlobStorageService,
    private config: ConfigService<TEnvSchema, true>
  ) {}
  async generateCertificate(data: IGenerateCertificateDTO): Promise<string> {
    const certificateName = "certificado" + new Date().getTime();

    const certificatePath = path.join(
      __dirname,
      `../../../temp/${certificateName}.png`
    );

    const { user, training } = data;

    return new Promise(async (resolve, reject) => {
      const fontBoldPoppinsPath = path.join(
        __dirname,
        "../../../src/assets/fonts/Poppins-Bold.ttf"
      );

      const fontMediumPoppinsPath = path.join(
        __dirname,
        "../../../src/assets/fonts/Poppins-Bold.ttf"
      );

      registerFont(fontBoldPoppinsPath, { family: "Poppins", weight: "bold" });
      registerFont(fontMediumPoppinsPath, {
        family: "Poppins",
        weight: "medium",
      });

      //create canvas
      const canvas = createCanvas(1920, 1080);
      const ctx = canvas.getContext("2d");

      //set certificate styles
      const gradientBackground = ctx.createLinearGradient(
        0,
        0,
        0,
        canvas.height
      );
      gradientBackground.addColorStop(0, "#211EB6");
      gradientBackground.addColorStop(1, "#111111");
      ctx.fillStyle = gradientBackground;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      //renders logo
      const logoPath = path.join(
        __dirname,
        "../../../src/assets/images/logo-certificate.png"
      );

      await loadImage(logoPath).then((image) => {
        ctx.drawImage(image, 80, 80, 96, 96);
      });

      //render certificate seal
      const certificateSealPath = path.join(
        __dirname,
        "../../../src/assets/images/seal-certificate.png"
      );

      await loadImage(certificateSealPath).then((image) => {
        ctx.drawImage(image, canvas.width - 320, canvas.height - 400, 240, 256);
      });

      //draws title
      const certificateTitle = "CERTIFICADO DE CONCLUSÃO";
      const certificateTitleTextMetrics = ctx.measureText(certificateTitle);
      const certificateTitlePositionX =
        (canvas.width - certificateTitleTextMetrics.width) / 1.9;
      ctx.font = "56px Poppins";
      ctx.fillStyle = "#FFFFFF";
      ctx.textAlign = "center";
      ctx.fillText(certificateTitle, certificateTitlePositionX, 160);

      //draws alum name
      ctx.font = "80px Poppins";
      ctx.fillStyle = "#FFFFFF";
      ctx.textAlign = "left";
      ctx.fillText(formatUserCertificateName(user.name), 200, 360);

      //draws conclusion text
      const conclusionTextPt1 = `concluiu o treinamento ${training.name} com duração total de ${training.duration} horas`;
      const conclusionTextPt2 = `na data de ${formatDateNow()}.`;
      ctx.font = "28px Verdana";
      ctx.fillStyle = "#FFFFFF";
      ctx.textAlign = "left";
      ctx.fillText(conclusionTextPt1, 200, 440);
      ctx.fillText(conclusionTextPt2, 200, 480);

      //draws hassh title text
      const hashTitle = "Hash de identificação:";
      ctx.font = "24px Verdana";
      ctx.fillText(hashTitle, 200, 880);
      //draws hassh text
      const hashText = training.id + user.id;
      ctx.font = "24px Verdana";
      ctx.fillText(hashText, 200, 920);

      //draws footer rect
      ctx.fillStyle = "#0267FF";
      ctx.fillRect(0, canvas.height - 24, canvas.width, 24);

      // Save as PNG
      const fileStream = fs.createWriteStream(certificatePath);
      const stream = canvas.createPNGStream();
      stream.pipe(fileStream);
      fileStream.on("finish", () => {
        console.log(
          "The certificate has been created successfully at:",
          certificatePath
        );
        resolve(certificatePath);
      });
      fileStream.on("error", reject);
    });
  }

  async uploadFile(filePath: string, fileName: string) {
    const blobStorageContainerName = this.config.get(
      "AZURE_BLOB_STORAGE_CERTIFICATES_CONTAINER_NAME",
      { infer: true }
    );
    const blobClient = this.azureBlobStorageProvider
      .getBlobServiceClient()
      .getContainerClient(blobStorageContainerName)
      .getBlockBlobClient(fileName);
    const certificate = fs.readFileSync(filePath);
    await blobClient.uploadData(certificate);
    fs.unlink(filePath, () =>
      console.log("Temporary certificate file removed")
    );
    return blobClient.url;
  }
}
