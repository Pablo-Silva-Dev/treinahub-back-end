import BitmovinApi, {
  AacAudioConfiguration,
  AclEntry,
  AclPermission,
  AzureInput,
  AzureOutput,
  BitmovinResponse,
  CloudRegion,
  ConsoleLogger,
  DashManifestDefault,
  DashManifestDefaultVersion,
  Encoding,
  EncodingOutput,
  Fmp4Muxing,
  H264VideoConfiguration,
  HlsManifestDefault,
  HlsManifestDefaultVersion,
  ManifestGenerator,
  ManifestResource,
  MuxingStream,
  PresetConfiguration,
  StartEncodingRequest,
  Stream,
  StreamInput,
  StreamSelectionMode,
} from "@bitmovin/api-sdk";
import { ConflictException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TEnvSchema } from "env";

@Injectable()
export class BitmovinVideoEncodingService {
  constructor(private configService: ConfigService<TEnvSchema, true>) {}
  async commonSetup(videoName: string, videoInputPath: string) {
    const Logger = new ConsoleLogger();
    const bitmovinApi = new BitmovinApi({
      apiKey: this.configService.get("BITMOVIN_API_KEY"),
      logger: Logger,
    });

    const baseOutputPath = `${videoName}/dash`;

    let inputVideo: AzureInput,
      outputVideo: AzureOutput,
      videoCodecH264: H264VideoConfiguration,
      audioCodecAAC: AacAudioConfiguration,
      encoding: Encoding,
      videoStream: Stream,
      audioStream: Stream;

    try {
      //creates a new input video reference that will be used to encode (doesn't upload a new file to Azure)
      const inputVideoName = videoName + "-bitmovin-input";
      inputVideo = await bitmovinApi.encoding.inputs.azure.create(
        new AzureInput({
          accountName: this.configService.get("AZURE_STORAGE_ACCOUNT_NAME"),
          accountKey: this.configService.get("AZURE_STORAGE_ACCOUNT_KEY"),
          container: this.configService.get(
            "AZURE_BLOB_STORAGE_VIDEO_CLASSES_CONTAINER_NAME"
          ),
          name: inputVideoName,
        })
      );
    } catch (error) {
      console.log("[INTERNAL ERROR]", error.message);
      throw new ConflictException({
        message: "An error occurred at trying to create a new inputVideo.",
        error: error.message,
      });
    }

    try {
      //creates a new output location in Azure where the encoded video and manifest will be stored hereafter
      const outputVideoName = videoName + "-bitmovin-output";
      outputVideo = await bitmovinApi.encoding.outputs.azure.create(
        new AzureOutput({
          accountName: this.configService.get("AZURE_STORAGE_ACCOUNT_NAME"),
          accountKey: this.configService.get("AZURE_STORAGE_ACCOUNT_KEY"),
          container: this.configService.get(
            "AZURE_BLOB_STORAGE_BITMOVIN_OUTPUTS_CONTAINER_NAME"
          ),
          name: outputVideoName,
        })
      );
    } catch (error) {
      console.log("[INTERNAL ERROR]", error.message);
      throw new ConflictException({
        message: "An error occurred at trying to create a new outputVideo.",
        error: error.message,
      });
    }

    try {
      //creates a video codec for mounting the video
      const videoCodecName = videoName + "-H264-video-codec";
      videoCodecH264 =
        await bitmovinApi.encoding.configurations.video.h264.create(
          new H264VideoConfiguration({
            name: videoCodecName,
            bitrate: 5000000,
            width: 1920,
            height: 1080,
            presetConfiguration: PresetConfiguration.VOD_HIGH_QUALITY,
          })
        );
    } catch (error) {
      console.log("[INTERNAL ERROR]", error.message);
      throw new ConflictException({
        message: "An error occurred at trying to create a new videoCodecH264.",
        error: error.message,
      });
    }

    try {
      //creates an audio codec for mounting the video
      const audioCodecName = videoName + "-AAC-audio-codec";
      audioCodecAAC =
        await bitmovinApi.encoding.configurations.audio.aac.create(
          new AacAudioConfiguration({
            name: audioCodecName,
            bitrate: 192000,
            rate: 48000,
          })
        );
    } catch (error) {
      console.log("[INTERNAL ERROR]", error.message);
      throw new ConflictException({
        message:
          "An error occurred at trying to create a new audioCodecAAC. Check if the video has audio.",
        error: error.message,
      });
    }

    try {
      // create a new encoding with a specified cloud region
      const encodingName = videoName + "-encoding";
      encoding = await bitmovinApi.encoding.encodings.create(
        new Encoding({
          name: encodingName,
          cloudRegion: CloudRegion.AZURE_BRAZIL_SOUTH,
        })
      );
    } catch (error) {
      console.log("[INTERNAL ERROR]", error.message);
      throw new ConflictException({
        message: "An error occurred at trying to create a new encoding.",
        error: error.message,
      });
    }

    const streamVideoInput = new StreamInput({
      inputId: inputVideo.id,
      //must be the same name of the file stored on the Azure container
      inputPath: videoInputPath,
      selectionMode: StreamSelectionMode.AUTO,
    });
    const streamAudioInput = new StreamInput({
      inputId: inputVideo.id,
      //must be the same name of the file stored on the Azure container
      inputPath: videoInputPath,
      selectionMode: StreamSelectionMode.AUTO,
    });

    try {
      videoStream = await bitmovinApi.encoding.encodings.streams.create(
        encoding.id,
        new Stream({
          codecConfigId: videoCodecH264.id,
          inputStreams: [streamVideoInput],
        })
      );
    } catch (error) {
      console.log("[INTERNAL ERROR]", error.message);
      throw new ConflictException({
        message: "An error occurred at trying to create a new videoStream.",
        error: error.message,
      });
    }

    try {
      audioStream = await bitmovinApi.encoding.encodings.streams.create(
        encoding.id,
        new Stream({
          codecConfigId: audioCodecAAC.id,
          inputStreams: [streamAudioInput],
        })
      );
    } catch (error) {
      console.log("[INTERNAL ERROR]", error.message);
      throw new ConflictException({
        message:
          "An error occurred at trying to create a new audioStream.  Check if the video has audio.",
        error: error.message,
      });
    }

    const MUXING_SEGMENTS_LENGTH = 4;

    //packs the video into a manifest
    const manifestOutput = new EncodingOutput({
      outputId: outputVideo.id,
      outputPath: `${baseOutputPath}/manifest/`,
      acl: [
        new AclEntry({ permission: AclPermission.PUBLIC_READ, scope: "*" }),
      ],
    });

    return {
      bitmovinApi,
      outputVideo,
      encoding,
      videoStream,
      audioStream,
      MUXING_SEGMENTS_LENGTH,
      manifestOutput,
    };
  }
  async encodeDASHVideo(videoName: string, videoInputPath: string) {
    const commonData = await this.commonSetup(videoName, videoInputPath);
    const {
      bitmovinApi,
      MUXING_SEGMENTS_LENGTH,
      audioStream,
      videoStream,
      encoding,
      manifestOutput,
      outputVideo,
    } = commonData;

    try {
      //FMP4 is used for DASH manifest representation, for HLS manifest, use TS
      await bitmovinApi.encoding.encodings.muxings.fmp4.create(
        encoding.id,
        new Fmp4Muxing({
          segmentLength: MUXING_SEGMENTS_LENGTH,
          initSegmentName: `${videoName}-audio-segment-init`,
          streams: [new MuxingStream({ streamId: audioStream.id })],
          outputs: [
            new EncodingOutput({
              outputId: outputVideo.id,
              outputPath: manifestOutput.outputPath + "/audio/192000/fmp4/",
              acl: [
                new AclEntry({
                  permission: AclPermission.PUBLIC_READ,
                  scope: "*",
                }),
              ],
            }),
          ],
        })
      );
    } catch (error) {
      console.log("[INTERNAL ERROR]", error.message);
      throw new ConflictException({
        message:
          "An error occurred at trying to create a new fmp4 audio muxing.",
        error: error.message,
      });
    }

    try {
      //FMP4 is used for DASH manifest representation, for HLS manifest, use TS
      await bitmovinApi.encoding.encodings.muxings.fmp4.create(
        encoding.id,
        new Fmp4Muxing({
          segmentLength: MUXING_SEGMENTS_LENGTH,
          initSegmentName: `${videoName}-video-segment-init`,
          streams: [new MuxingStream({ streamId: videoStream.id })],
          outputs: [
            new EncodingOutput({
              outputId: outputVideo.id,
              outputPath:
                manifestOutput.outputPath + "/video/1024_1500000/fmp4/",
              acl: [
                new AclEntry({
                  permission: AclPermission.PUBLIC_READ,
                  scope: "*",
                }),
              ],
            }),
          ],
        })
      );
    } catch (error) {
      console.log("[INTERNAL ERROR]", error.message);
      throw new ConflictException({
        message:
          "An error occurred at trying to create a new fmp4 video muxing.",
        error: error.message,
      });
    }

    let dashManifest = new DashManifestDefault({
      name: `${videoName}-manifest`,
      manifestName: "stream.mpd",
      encodingId: encoding.id,
      version: DashManifestDefaultVersion.V2,
      outputs: [manifestOutput],
    });

    try {
      dashManifest =
        await bitmovinApi.encoding.manifests.dash.default.create(dashManifest);
    } catch (error) {
      console.log("[INTERNAL ERROR]", error.message);
      throw new ConflictException({
        message: "An error occurred at trying to create a new dashManifest.",
        error: error.message,
      });
    }

    //requests a new encoding to the Bitmovin API
    const startEncodingRequest = new StartEncodingRequest({
      manifestGenerator: ManifestGenerator.V2,
      vodDashManifests: [new ManifestResource({ manifestId: dashManifest.id })],
    });

    let dashEncoding: BitmovinResponse;

    try {
      dashEncoding = await bitmovinApi.encoding.encodings.start(
        encoding.id,
        startEncodingRequest
      );
    } catch (error) {
      console.log("[INTERNAL ERROR]", error.message);
      throw new ConflictException({
        message: "An error occurred at trying to create a new dashEncoding.",
        error: error.message,
      });
    }
    return dashEncoding;
  }

  async encodeHLSVideo(videoName: string, videoInputPath: string) {
    const commonData = await this.commonSetup(videoName, videoInputPath);
    const {
      bitmovinApi,
      MUXING_SEGMENTS_LENGTH,
      audioStream,
      videoStream,
      encoding,
      manifestOutput,
      outputVideo,
    } = commonData;

    try {
      //creates a ts muxing for HLS manifest
      await bitmovinApi.encoding.encodings.muxings.ts.create(
        encoding.id,
        new Fmp4Muxing({
          segmentLength: MUXING_SEGMENTS_LENGTH,
          initSegmentName: `${videoName}-audio-segment-init`,
          streams: [new MuxingStream({ streamId: audioStream.id })],
          outputs: [
            new EncodingOutput({
              outputId: outputVideo.id,
              outputPath: manifestOutput.outputPath + "/audio/192000/fmp4/",
              acl: [
                new AclEntry({
                  permission: AclPermission.PUBLIC_READ,
                  scope: "*",
                }),
              ],
            }),
          ],
        })
      );
    } catch (error) {
      console.log("[INTERNAL ERROR]", error.message);
      throw new ConflictException({
        message: "An error occurred at trying to create a new fmp4 audio muxing.",
        error: error.message,
      });
    }

    try {
      //creates a ts muxing for HLS manifest
      await bitmovinApi.encoding.encodings.muxings.ts.create(
        encoding.id,
        new Fmp4Muxing({
          segmentLength: MUXING_SEGMENTS_LENGTH,
          initSegmentName: `${videoName}-video-segment-init`,
          streams: [new MuxingStream({ streamId: videoStream.id })],
          outputs: [
            new EncodingOutput({
              outputId: outputVideo.id,
              outputPath:
                manifestOutput.outputPath + "/video/1024_1500000/fmp4/",
              acl: [
                new AclEntry({
                  permission: AclPermission.PUBLIC_READ,
                  scope: "*",
                }),
              ],
            }),
          ],
        })
      );
    } catch (error) {
      console.log("[INTERNAL ERROR]", error.message);
      throw new ConflictException({
        message: "An error occurred at trying to create a new fmp4 video muxing.",
        error: error.message,
      });
    }

    let hlsManifest = new HlsManifestDefault({
      name: `${videoName}-manifest`,
      manifestName: "stream.m3u8",
      encodingId: encoding.id,
      version: HlsManifestDefaultVersion.V1,
      outputs: [manifestOutput],
    });

    try {
      hlsManifest =
        await bitmovinApi.encoding.manifests.hls.default.create(hlsManifest);
    } catch (error) {
      console.log("[INTERNAL ERROR]", error.message);
      throw new ConflictException({
        message: "An error occurred at trying to create a new hlsManifest.",
        error: error.message,
      });
    }

    //requests a new encoding to the Bitmovin API
    const startEncodingRequest = new StartEncodingRequest({
      manifestGenerator: ManifestGenerator.V2,
      vodHlsManifests: [new ManifestResource({ manifestId: hlsManifest.id })],
    });

    let hlsEncoding: BitmovinResponse;

    try {
      hlsEncoding = await bitmovinApi.encoding.encodings.start(
        encoding.id,
        startEncodingRequest
      );
    } catch (error) {
      console.log("[INTERNAL ERROR]", error.message);
      throw new ConflictException({
        message: "An error occurred at trying to create a new hlsEncoding.",
        error: error.message,
      });
    }

    return hlsEncoding;
  }
}
