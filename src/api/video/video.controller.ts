import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import {
  VIDEO_SERVICE_NAME,
  V1CreateVideoRequest,
  V1CreateVideoResponse,
  V1GetVideoRequest,
  V1GetVideoResponse,
} from '@proto/backoffice.pb';

import { VideoService } from './video.service';

@Controller()
export class VideoController {
  @Inject(VideoService)
  private readonly videoService: VideoService;

  @GrpcMethod(VIDEO_SERVICE_NAME, 'V1CreateVideo')
  private v1CreateVideo(payload: V1CreateVideoRequest): Promise<V1CreateVideoResponse> {
    return this.videoService.V1CreateVideo(payload);
  }

  @GrpcMethod(VIDEO_SERVICE_NAME, 'V1GetVideo')
  private v1GetVideo(payload: V1GetVideoRequest): Promise<V1GetVideoResponse> {
    return this.videoService.V1GetVideo(payload);
  }
}
