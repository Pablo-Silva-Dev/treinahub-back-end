import { IRemoveWatchedClassDTO } from "@/infra/dtos/WatchedClassDTO";
import { UsersImplementation } from "@/infra/repositories/implementations/usersImplementation";
import { VideoClassesImplementation } from "@/infra/repositories/implementations/videoClassesImplementation";
import { WatchedClassesImplementation } from "@/infra/repositories/implementations/watchedClassesImplementation";
import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class RemoveWatchedClassUseCase {
  constructor(
    private watchedClassesImplementation: WatchedClassesImplementation,
    private usersImplementation: UsersImplementation,
    private videoClassesImplementation: VideoClassesImplementation
  ) {}
  async execute(data: IRemoveWatchedClassDTO) {
    const { user_id, videoclass_id } = data;

    const user = await this.usersImplementation.getUserById(user_id);
    const videoClass =
      await this.videoClassesImplementation.getVideoClassById(videoclass_id);

    if (!user) {
      throw new NotFoundException("User not found");
    }

    if (!videoClass) {
      throw new NotFoundException("Video class not found");
    }

    await this.watchedClassesImplementation.removeWatchedClass({
      user_id,
      videoclass_id,
    });
  }
}
