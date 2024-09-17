import { IGetWatchedClassByUserAndVideoDTO } from "@/infra/dtos/WatchedClassDTO";
import { GetWatchedClassByUserAndClassUseCase } from "@/infra/useCases/watchedClasses/GetWatchedClassByUserAndClassUseCase";
import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  NotFoundException,
  Post,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import z from "zod";

const validationSchema = z.object({
  user_id: z.string(),
  videoclass_id: z.string(),
});

@Controller("/watched-classes/get-by-user-and-class")
@UseGuards(AuthGuard("jwt-user"))
export class GetWatchedClassByUserAndClassController {
  constructor(private getWatchedClass: GetWatchedClassByUserAndClassUseCase) {}
  @HttpCode(200)
  @Post()
  async handle(@Body() body: IGetWatchedClassByUserAndVideoDTO) {
    const isBodyValidated = validationSchema.safeParse(body);

    if (!isBodyValidated.success) {
      throw new ConflictException({
        message: "An error occurred",
        error: isBodyValidated.error.issues,
      });
    }

    try {
      const { user_id, videoclass_id } = body;

      const watchedClass = await this.getWatchedClass.execute({
        user_id,
        videoclass_id,
      });
      return watchedClass;
    } catch (error) {
      console.log("[INTERNAL ERROR]", error.message);
      throw new NotFoundException({
        message: "WatchedClass not found",
        error: error.message,
      });
    }
  }
}
