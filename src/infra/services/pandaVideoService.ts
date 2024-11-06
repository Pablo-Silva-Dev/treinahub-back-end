import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import axios from "axios";
import { TEnvSchema } from "env";
import { v4 as uuidv4 } from "uuid";

@Injectable()
export class PandaVideoService {
  private pandaVideoApiKey: string;

  constructor(private configService: ConfigService<TEnvSchema, true>) {
    this.pandaVideoApiKey = this.configService.get("PANDA_VIDEO_API_KEY");
  }

  private parseStringToBase64 = (string: string) =>
    Buffer.from(string).toString("base64");

  async createFolder(folderName: string, parentFolderId?: string) {
    try {
      const headers = {
        accept: "application/json",
        Authorization: this.pandaVideoApiKey,
      };

      const body = parentFolderId
        ? {
            name: folderName,
            parent_folder_id: parentFolderId,
          }
        : {
            name: folderName,
          };

      const { data } = await axios.post(
        "https://api-v2.pandavideo.com.br/folders",
        body,
        {
          headers,
        }
      );
      return data;
    } catch (error) {
      console.log(
        "Error at trying to create a new folder on PandaVideo: ",
        error
      );
    }
  }
  async listFolders() {
    try {
      const headers = {
        accept: "application/json",
        Authorization: this.pandaVideoApiKey,
      };

      const { data } = await axios.get(
        "https://api-v2.pandavideo.com.br/folders",

        {
          headers,
        }
      );
      return data;
    } catch (error) {
      console.log("Error at trying to list PandaVideo folders: ", error);
    }
  }
  async deleteFolder(folderId: string) {
    try {
      const headers = {
        accept: "application/json",
        Authorization: this.pandaVideoApiKey,
      };

      const { data } = await axios.delete(
        `https://api-v2.pandavideo.com.br/folders/${folderId}`,

        {
          headers,
        }
      );
      return data;
    } catch (error) {
      console.log("Error at trying to delete folder on PandaVideo: ", error);
    }
  }
  async uploadVideo(videoBuffer: Buffer, fileName: string, folderId?: string) {
    const videoId = uuidv4();
    let metadata = `authorization ${this.parseStringToBase64(this.pandaVideoApiKey)}`;
    if (folderId) {
      metadata += `, folder_id ${this.parseStringToBase64(folderId)}`;
    }
    metadata += `, filename ${this.parseStringToBase64(fileName)}`;
    metadata += `, video_id ${this.parseStringToBase64(videoId)}`;
    try {
      const host = "uploader-us01";

      const { data } = await axios.post(
        `https://${host}.pandavideo.com.br/files`,
        videoBuffer,
        {
          headers: {
            "Tus-Resumable": "1.0.0",
            "Upload-Length": videoBuffer.length.toString(),
            "Content-Type": "application/offset+octet-stream",
            "Upload-Metadata": metadata,
          },
        }
      );
      return data;
    } catch (error) {
      console.log("Error at trying to upload video on PandaVideo: ", error);
    }
  }
  async getVideo(videoId: string) {
    try {
      const headers = {
        accept: "application/json",
        Authorization: this.pandaVideoApiKey,
      };

      const { data } = await axios.get(
        `https://api-v2.pandavideo.com.br/videos/${videoId}`,
        {
          headers,
        }
      );
      return data;
    } catch (error) {
      console.log("Error at trying to list PandaVideo folders: ", error);
    }
  }
  async listVideos(folderId?: string) {
    try {
      const headers = {
        accept: "application/json",
        Authorization: this.pandaVideoApiKey,
      };

      const url = "https://api-v2.pandavideo.com.br/videos";
      const params = folderId ? { folder_id: folderId } : {};

      const { data } = await axios.get(url, {
        headers,
        params,
      });
      return data;
    } catch (error) {
      console.log("Error at trying to list PandaVideo folders: ", error);
    }
  }
  async deleteVideo(videoIds: string[]) {
    try {
      const headers = {
        accept: "application/json",
        Authorization: this.pandaVideoApiKey,
      };

      const body = videoIds.map((videoId) => ({ video_id: videoId }));

      const { data } = await axios.delete(
        "https://api-v2.pandavideo.com.br/videos",
        {
          headers,
          data: body,
        }
      );
      return data;
    } catch (error) {
      console.log("Error at trying to delete video on Panda service: ", error);
    }
  }
}
