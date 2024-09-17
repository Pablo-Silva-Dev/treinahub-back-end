import { IGetWatchedClassByUserAndVideoDTO } from "@/infra/dtos/WatchedClassDTO";
import { WatchedClassesImplementation } from "@/infra/repositories/implementations/watchedClassesImplementation";
import { Injectable, NotFoundException } from "@nestjs/common";
import { UsersImplementation } from "../../repositories/implementations/usersImplementation";

@Injectable()
export class GetWatchedClassByUserAndClassUseCase {
  constructor(
    private watchedClassesImplementation: WatchedClassesImplementation,
    private usersImplementation: UsersImplementation
  ) {}
  async execute(data: IGetWatchedClassByUserAndVideoDTO) {
    const { user_id, videoclass_id } = data;

    const user = this.usersImplementation.getUserById(user_id);
    if (!user) {
      throw new NotFoundException("User not found");
    }
    const watchedClass =
      await this.watchedClassesImplementation.getUniqueWatchedClass({
        user_id,
        videoclass_id,
      });
    if (!watchedClass) {
      throw new NotFoundException("WatchedClass not found");
    }
    return watchedClass;
  }
}
