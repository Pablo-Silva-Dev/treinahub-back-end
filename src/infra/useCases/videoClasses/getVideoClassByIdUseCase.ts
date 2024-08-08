import { VideoClassesImplementation } from "@/infra/repositories/implementations/videoClassesImplementation";
import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class GetVideoClassByIdUseCase {
  constructor(private videoClassesImplementation: VideoClassesImplementation) {}
  async execute(videoClassId: string) {
    const videoClass =
      await this.videoClassesImplementation.getVideoClassById(videoClassId);

    if (!videoClass) {
      throw new NotFoundException("Video class not found");
    }

    return videoClass;
  }
}
