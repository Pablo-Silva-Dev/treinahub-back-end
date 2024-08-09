import { TrainingsImplementation } from "@/infra/repositories/implementations/trainingsImplementation";
import { UsersImplementation } from "@/infra/repositories/implementations/usersImplementation";
import { WatchedClassesImplementation } from "@/infra/repositories/implementations/watchedClassesImplementation";
import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class ListWatchedClassesByUserIdAndTrainingIdUseCase {
  constructor(
    private watchedClassesImplementation: WatchedClassesImplementation,
    private usersImplementation: UsersImplementation,
    private trainingsImplementation: TrainingsImplementation
  ) {}
  async execute(user_id, training_id: string) {
    const user = await this.usersImplementation.getUserById(user_id);
    const training =
      await this.trainingsImplementation.getTrainingById(training_id);
    if (!user) {
      throw new NotFoundException("User not found");
    }
    if (!training) {
      throw new NotFoundException("Training not found");
    }

    const watchedClasses =
      await this.watchedClassesImplementation.listWatchedClassesByUserIdAndTrainingId(
        user_id,
        training_id
      );

    return watchedClasses;
  }
}
