import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import axios from "axios";
import { TEnvSchema } from "env";

@Injectable()
export class PandaVideoService {
  private pandaVideoApiKey: string;

  constructor(private configService: ConfigService<TEnvSchema, true>) {
    this.pandaVideoApiKey = this.configService.get("PANDA_VIDEO_API_KEY");
  }
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
      console.log(
        "Error at trying to create a new folder on PandaVideo: ",
        error
      );
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
      console.log(
        "Error at trying to create a new folder on PandaVideo: ",
        error
      );
    }
  }
}
