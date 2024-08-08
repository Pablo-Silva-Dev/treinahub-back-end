import { VideoClassesImplementation } from "@/infra/repositories/implementations/videoClassesImplementation";
import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class DeleteVideoClassUseCase {
  constructor(private videoClassesImplementation: VideoClassesImplementation) {}
  async execute(videoClassId: string) {
    const videoClasses =
      await this.videoClassesImplementation.getVideoClassById(videoClassId);
    if (!videoClasses) {
      throw new NotFoundException("Video class not found");
    }
    await this.videoClassesImplementation.deleteVideoClass(videoClassId);
  }
}
