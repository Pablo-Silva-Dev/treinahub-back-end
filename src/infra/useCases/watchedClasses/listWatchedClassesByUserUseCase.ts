import { UsersImplementation } from "@/infra/repositories/implementations/usersImplementation";
import { WatchedClassesImplementation } from "@/infra/repositories/implementations/watchedClassesImplementation";
import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class ListWatchedClassesByUserUseCase {
  constructor(
    private watchedClassesImplementation: WatchedClassesImplementation,
    private usersImplementation: UsersImplementation
  ) {}
  async execute(userId: string) {
    const user = await this.usersImplementation.getUserById(userId);
    if (!user) {
      throw new NotFoundException("User not found!");
    }
    const watchedClasses =
      await this.watchedClassesImplementation.listWatchedClassesByUser(userId);
    return watchedClasses;
  }
}
