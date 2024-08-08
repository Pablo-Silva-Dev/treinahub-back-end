import { VideoClassesImplementation } from "@/infra/repositories/implementations/videoClassesImplementation";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ListVideoClassesUseCase {
  constructor(private videoClassesImplementation: VideoClassesImplementation) {}
  async execute() {
    const videoClasses =
      await this.videoClassesImplementation.listVideoClasses();
    return videoClasses;
  }
}
