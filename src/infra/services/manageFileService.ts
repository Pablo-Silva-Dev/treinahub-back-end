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

// ------- minimal env-aware path helpers -------
const runtimeRoot =
  process.env.NODE_ENV === "production"
    ? path.join(process.cwd(), "dist")
    : path.join(process.cwd(), "src");

const assetsDir = path.join(runtimeRoot, "assets");
const tempDir = path.join(process.cwd(), "temp");
if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });

function asset(...p: string[]) {
  return path.join(assetsDir, ...p);
}
// ---------------------------------------------

@Injectable()
export class ManageFileService {
  constructor(private azureBlobStorageProvider: AzureBlobStorageService) {}

async generateCertificate(data: IGenerateCertificateDTO): Promise<string> {
  // Resolve env-aware paths (works in dev and prod)
  const runtimeRoot =
    process.env.NODE_ENV === "production"
      ? path.join(process.cwd(), "dist")
      : path.join(process.cwd(), "src");
  const assetsDir = path.join(runtimeRoot, "assets");
  const tempDir = path.join(process.cwd(), "temp");
  fs.mkdirSync(tempDir, { recursive: true });

  const certificateName = "certificado" + Date.now();
  const certificatePath = path.join(tempDir, `${certificateName}.png`);

  const { user, training } = data;

  // Fonts
  const fontBoldPoppinsPath = path.join(assetsDir, "fonts", "Poppins-Bold.ttf");
  const fontMediumPoppinsPath = path.join(
    assetsDir,
    "fonts",
    "Poppins-Medium.ttf"
  );
  registerFont(fontBoldPoppinsPath, { family: "Poppins", weight: "bold" });
  registerFont(fontMediumPoppinsPath, { family: "Poppins", weight: "500" });

  // Canvas
  const canvas = createCanvas(1920, 1080);
  const ctx = canvas.getContext("2d");

  // Background
  const gradientBackground = ctx.createLinearGradient(0, 0, 0, canvas.height);
  gradientBackground.addColorStop(0, "#211EB6");
  gradientBackground.addColorStop(1, "#111111");
  ctx.fillStyle = gradientBackground;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Images
  const logoPath = path.join(assetsDir, "images", "logo-text.png");
  const certificateSealPath = path.join(
    assetsDir,
    "images",
    "seal-certificate.png"
  );

  // Draw logo
  const logo = await loadImage(logoPath);
  const logoX = 80,
    logoY = 80,
    logoW = 260,
    logoH = 64;
  ctx.drawImage(logo, logoX, logoY, logoW, logoH);

  // Draw title (to the right of the logo, not overlapping)
  const certificateTitle = "CERTIFICADO DE CONCLUSÃO";
  ctx.font = "56px Poppins";
  ctx.fillStyle = "#FFFFFF";
  ctx.textAlign = "left";
  const certificateTitleX = logoX + logoW + 80;
  const certificateTitleY = logoY + Math.floor(logoH * 0.75);
  ctx.fillText(certificateTitle, certificateTitleX, certificateTitleY);

  // Seal (bottom-right)
  const seal = await loadImage(certificateSealPath);
  ctx.drawImage(seal, canvas.width - 320, canvas.height - 400, 240, 256);

  // Student name
  ctx.font = "80px Poppins";
  ctx.fillStyle = "#FFFFFF";
  ctx.textAlign = "left";
  ctx.fillText(formatUserCertificateName(user.name), 200, 360);

  // Body text
  const conclusionTextPt1 = `concluiu na data de ${formatDateNow()} com duração total de ${secondsToHours(
    training.duration
  )} `;
  const conclusionTextPt2 = `o treinamento de "${training.name}".`;
  ctx.font = "28px Verdana";
  ctx.fillStyle = "#FFFFFF";
  ctx.textAlign = "left";
  ctx.fillText(conclusionTextPt1, 200, 440);
  ctx.fillText(conclusionTextPt2, 200, 480);

  // Hash
  const hashTitle = "Hash de identificação:";
  ctx.font = "24px Verdana";
  ctx.fillText(hashTitle, 200, 880);
  const hashText = training.id + user.id;
  ctx.font = "24px Verdana";
  ctx.fillText(hashText, 200, 920);

  // Footer bar
  ctx.fillStyle = "#0267FF";
  ctx.fillRect(0, canvas.height - 24, canvas.width, 24);

  // Save PNG
  await new Promise<void>((resolve, reject) => {
    const out = fs.createWriteStream(certificatePath);
    canvas.createPNGStream().pipe(out);
    out.on("finish", resolve);
    out.on("error", reject);
  });

  return certificatePath;
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
    const blobPath = prefix?.endsWith("/") ? `${prefix}${fileName}` : `${prefix}/${fileName}`;

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
      console.error(`Blob ${fileName} does not exist in container ${AzureContainerName}`);
      throw new Error(`Blob ${fileName} does not exist.`);
    }

    await blobClient.delete({ deleteSnapshots: "include" });
    console.log(`File ${fileName} deleted from container ${AzureContainerName}`);
  }

  async removeAllExistingUploadedFiles(
    AzureContainerName: string,
    prefix?: string
  ): Promise<void> {
    const containerClient = this.azureBlobStorageProvider
      .getBlobServiceClient()
      .getContainerClient(AzureContainerName);

    for await (const blob of prefix
      ? containerClient.listBlobsFlat({ prefix })
      : containerClient.listBlobsFlat()) {
      const file = containerClient.getBlobClient(blob.name);
      await file.delete();
    }
  }

  async removeFolderAndContents(containerName: string, folderName: string) {
    const containerClient = this.azureBlobStorageProvider
      .getBlobServiceClient()
      .getContainerClient(containerName);

    const formattedFolderName = formatSlugFolderName(folderName);
    const folderPath = formattedFolderName + "/";

    for await (const blob of containerClient.listBlobsFlat({ prefix: folderPath })) {
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

      const folderPath = folderName.endsWith("/") ? folderName : folderName + "/";
      const blobClient = containerClient.getBlockBlobClient(`${folderPath}placeholder.txt`);
      const placeholderContent = "";
      await blobClient.upload(placeholderContent, placeholderContent.length);
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

    const fileNames: string[] = [];
    for await (const blob of prefix
      ? containerClient.listBlobsFlat({ prefix })
      : containerClient.listBlobsFlat()) {
      // @ts-ignore - internal name
      const { _name } = containerClient.getBlobClient(blob.name);
      fileNames.push(_name);
    }
    return fileNames;
  }
}
