import * as ffmpeg from "fluent-ffmpeg";
import * as fs from "fs";
import * as path from "path";
import { promisify } from "util";

const writeFile = promisify(fs.writeFile);
const unlink = promisify(fs.unlink);

//Receivers the file.buffer, creates a temporary file based on file.buffer and calcs its duration based on filePath
export async function getVideoDuration(fileBuffer: Buffer): Promise<number> {
  const tempFilePath = path.join(
    __dirname,
    `temp_video_file${new Date().getTime()}.mp4`
  );
  await writeFile(tempFilePath, fileBuffer);

  return new Promise((resolve, reject) => {
    //Needs to know the filePath to identify the file and calculate its duration
    ffmpeg.ffprobe(tempFilePath, async (err, metadata) => {
      await unlink(tempFilePath);
      if (err) reject(err);
      else resolve(metadata.format.duration);
    });
  });
}
