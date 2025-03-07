import { Injectable } from "@nestjs/common";
import { createCanvas, loadImage, registerFont } from "canvas";
import * as fs from "fs";
import * as path from "path";

import { secondsToHours } from "@/utils/convertTime";
import { formatDateNow } from "@/utils/formatDate";
import { formatSlugFolderName } from "@/utils/formatSlug";
import { formatUserCertificateName } from "@/utils/formatUserCertificateName";
import { IGenerateCertificateDTO } from "../dtos/CertificateDTO";
import { AzureBlobStorageService } from "./azureBlobStorageService";

@Injectable()
export class ManageFileService {
  constructor(private azureBlobStorageProvider: AzureBlobStorageService) {}
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
        "../../../src/assets/images/logo-text.png"
      );

      await loadImage(logoPath).then((image) => {
        ctx.drawImage(image, 80, 80, 260, 64);
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
      //
      //draws conclusion text
      const conclusionTextPt1 = `concluiu na data de ${formatDateNow()} com duração total de ${secondsToHours(training.duration)} `;
      const conclusionTextPt2 = `o treinamento de "${training.name}".`;
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

  async uploadFile(
    fileContent: Buffer | string,
    fileName: string,
    AzureContainerName: string
  ) {
    const blobClient = this.azureBlobStorageProvider
      .getBlobServiceClient()
      .getContainerClient(AzureContainerName)
      .getBlockBlobClient(fileName);
    await blobClient.uploadData(fileContent as Buffer);
    if (typeof fileContent === "string") {
      fs.unlink(fileContent, () => console.log("Temporary file removed"));
    }
    return blobClient.url;
  }

  async removeUploadedFile(
    fileName: string,
    AzureContainerName: string,
    prefix?: string
  ) {
    const blobPath = prefix.endsWith("/")
      ? `${prefix}${fileName}`
      : `${prefix}/${fileName}`;

    const blobClient = prefix
      ? this.azureBlobStorageProvider
          .getBlobServiceClient()
          .getContainerClient(AzureContainerName)
          .getBlockBlobClient(blobPath)
      : this.azureBlobStorageProvider
          .getBlobServiceClient()
          .getContainerClient(AzureContainerName)
          .getBlockBlobClient(fileName);

    const blobExists = await blobClient.exists();

    if (!blobExists) {
      console.error(
        `Blob ${fileName} does not exist in container ${AzureContainerName}`
      );
      throw new Error(`Blob ${fileName} does not exist.`);
    }

    await blobClient.delete({
      deleteSnapshots: "include",
    });

    console.log(
      `File ${fileName} deleted from container ${AzureContainerName}`
    );
  }

  async removeAllExistingUploadedFiles(
    AzureContainerName: string,
    prefix?: string
  ): Promise<void> {
    const containerClient = this.azureBlobStorageProvider
      .getBlobServiceClient()
      .getContainerClient(AzureContainerName);

    // List all blobs in the container
    for await (const blob of prefix
      ? containerClient.listBlobsFlat({ prefix })
      : containerClient.listBlobsFlat()) {
      const file = containerClient.getBlobClient(blob.name);

      // Delete each blob
      await file.delete();
    }
  }

  async removeFolderAndContents(containerName: string, folderName: string) {
    const containerClient = this.azureBlobStorageProvider
      .getBlobServiceClient()
      .getContainerClient(containerName);

    // Decode the folder name to handle spaces and other encoded characters
    // const decodedFolderName = decodeURIComponent(folderName);
    const formattedFolderName = formatSlugFolderName(folderName);

    // Ensure the folder name ends with a slash to represent the folder path
    const folderPath = formattedFolderName + "/";

    for await (const blob of containerClient.listBlobsFlat({
      prefix: folderPath,
    })) {
      console.log("Deleting blob:", blob.name);
      const blobClient = containerClient.getBlobClient(blob.name);
      await blobClient.delete();
      console.log("Deleted blob:", blob.name);
    }

    console.log("Completed deletion of all blobs in folder:", folderPath);
  }

  async createFolder(containerName: string, folderName: string) {
    try {
      const containerClient = this.azureBlobStorageProvider
        .getBlobServiceClient()
        .getContainerClient(containerName);

      const folderPath = folderName.endsWith("/")
        ? folderName
        : folderName + "/";
      //uploads a placeholder file to create a folder automatically
      const blobClient = containerClient.getBlockBlobClient(
        `${folderPath}placeholder.txt`
      );
      const placeholderContent = "";
      blobClient.upload(placeholderContent, placeholderContent.length);
      return folderName;
    } catch (error) {
      console.error(
        `Failed to create folder "${folderName}" in container "${containerName}":`,
        error
      );
      throw error;
    }
  }

  async listContainerFiles(
    AzureContainerName: string,
    prefix?: string
  ): Promise<string[]> {
    const containerClient = this.azureBlobStorageProvider
      .getBlobServiceClient()
      .getContainerClient(AzureContainerName);

    let fileNames: string[] = [];

    // List all blobs in the container
    for await (const blob of prefix
      ? containerClient.listBlobsFlat({ prefix })
      : containerClient.listBlobsFlat()) {
      //@ts-ignore
      const { _name } = containerClient.getBlobClient(blob.name);
      fileNames.push(_name);
    }
    return fileNames;
  }
}
