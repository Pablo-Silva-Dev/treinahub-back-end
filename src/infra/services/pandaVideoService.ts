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
  async createFolder(folderName: string) {
    try {
      const headers = {
        accept: "application/json",
        Authorization: this.pandaVideoApiKey,
      };

      await axios.post(
        "https://api-v2.pandavideo.com.br/folders",
        {
          name: folderName,
        },
        {
          headers,
        }
      );
    } catch (error) {
      console.log(
        "Error at trying to create a new folder on PandaVideo: ",
        error
      );
    }
  }
}
