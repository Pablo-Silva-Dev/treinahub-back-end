import { IUpdateVideoClassExecutionStatusDTO } from "@/infra/dtos/WatchedClassDTO";
import { WatchedClassesImplementation } from "@/infra/repositories/implementations/watchedClassesImplementation";
import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class UpdateVideoClassExecutionStatusUseCase {
  constructor(
    private watchedClassesImplementation: WatchedClassesImplementation
  ) {}
  async execute(data: IUpdateVideoClassExecutionStatusDTO) {
    const { user_id, videoclass_id } = data;
    const watchedClass =
      await this.watchedClassesImplementation.getUniqueWatchedClass({
        user_id,
        videoclass_id,
      });

    if (!watchedClass) {
      throw new NotFoundException("Video class did not watched.");
    }

    const updatedWatchedClass =
      await this.watchedClassesImplementation.updateVideoClassExecutionStatus(
        data
      );
    return updatedWatchedClass;
  }
}
