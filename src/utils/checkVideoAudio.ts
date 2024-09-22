import * as ffmpeg from "fluent-ffmpeg";
import * as fs from "fs";
import * as path from "path";
import { promisify } from "util";

const writeFile = promisify(fs.writeFile);
const unlink = promisify(fs.unlink);

export async function checkVideoAudio(fileBuffer: Buffer) {
  const tempFilePath = path.join(
    __dirname,
    `temp_video_file${new Date().getTime()}.mp4`
  );

  await writeFile(tempFilePath, fileBuffer);

  return new Promise(async (resolve, reject) => {
    ffmpeg.ffprobe(tempFilePath, async (err, metadata) => {
      await unlink(tempFilePath);
      if (err) {
        console.log("Error at checking if video has audio", err);
        reject(err);
      }
      const videoContainsAudio = metadata.streams.some(
        (stream) => stream.codec_type === "audio"
      );
      if (!videoContainsAudio) {
        console.log("[INTERNAL ERROR] Video must have an audio.");
        return resolve(false);
      }

      resolve(true);
    });
  });
}
