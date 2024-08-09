import { WatchedClassesImplementation } from "@/infra/repositories/implementations/watchedClassesImplementation";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ListWatchedClassesUseCase {
  constructor(
    private watchedClassesImplementation: WatchedClassesImplementation
  ) {}
  async execute() {
    const watchedClasses =
      await this.watchedClassesImplementation.listWatchedClasses();
    return watchedClasses;
  }
}
