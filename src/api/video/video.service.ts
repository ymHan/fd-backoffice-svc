import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Video } from '@model/entities/video.entity';
import { Category, CategorySubEnum, CategorySubCodeEnum, RecordType } from '@model/enum';

import {
  V1CreateVideoRequest,
  V1CreateVideoResponse,
  V1GetVideoRequest,
  V1GetVideoResponse,
} from '@proto/backoffice.pb';

@Injectable()
export class VideoService {
  @InjectRepository(Video)
  private readonly videoRepository: Repository<Video>;

  public async V1GetVideo(payload: V1GetVideoRequest): Promise<V1GetVideoResponse> {
    const video = await this.videoRepository.findOne({ where: { id: payload.id } });
    if (!video) {
      return {
        result: 'fail',
        status: 404,
        message: 'Video not found',
        data: null,
      };
    }
    return {
      result: 'success',
      status: 200,
      message: 'Video retrieved successfully',
      data: {
        id: video.id,
        email: video.email,
        title: video.title,
        subTitle: video.subTitle,
        description: video.description,
        ownerName: video.ownerName,
        ownerNickName: video.ownerNickName,
        ownerChannelName: video.ownerChannelName,
        ownerProfileIconUrl: video.ownerProfileIconUrl,
        thumbnailUrl: video.thumbnailUrl,
        viewCount: video.viewCount,
        reportCount: video.reportCount,
        likesCount: video.likesCount,
        duration: video.duration,
        category: video.category,
        categorySub: video.categorySub,
        categorySubCode: video.categorySubCode,
        recordType: video.recordType,
        contentUrlList: video.contentUrlList,
        poseIndicatorList: video.poseIndicatorList,
        nodeId: video.nodeId,
        createdAt: video.created_at,
      },
    };
  }

  public async V1CreateVideo(payload: V1CreateVideoRequest): Promise<V1CreateVideoResponse> {
    const video: Video = new Video();

    video.email = payload.email;
    video.title = payload.title;
    video.subTitle = payload.subTitle;
    video.description = payload.description;
    video.ownerName = payload.ownerName;
    video.ownerNickName = payload.ownerNickName;
    video.ownerChannelName = payload.ownerChannelName;
    video.ownerProfileIconUrl = payload.ownerProfileIconUrl;
    video.thumbnailUrl = payload.thumbnailUrl;
    video.duration = payload.duration;
    video.category = Category[payload.category];
    video.categorySub = CategorySubEnum[payload.categorySub];
    video.categorySubCode = CategorySubCodeEnum[payload.categorySubCode];
    video.recordType = RecordType[payload.recordType];
    video.contentUrlList = payload.contentUrlList;
    video.poseIndicatorList = payload.poseIndicatorList;
    video.nodeId = payload.nodeId;

    const datas = await this.videoRepository.save(video);

    return {
      result: 'success',
      status: 200,
      message: 'Video created successfully',
      data: {
        id: datas.id,
        email: datas.email,
        title: datas.title,
        subTitle: datas.subTitle,
        description: datas.description,
        ownerName: datas.ownerName,
        ownerNickName: datas.ownerNickName,
        ownerChannelName: datas.ownerChannelName,
        ownerProfileIconUrl: datas.ownerProfileIconUrl,
        thumbnailUrl: datas.thumbnailUrl,
        viewCount: datas.viewCount,
        reportCount: datas.reportCount,
        likesCount: datas.likesCount,
        duration: datas.duration,
        category: datas.category,
        categorySub: datas.categorySub,
        categorySubCode: datas.categorySubCode,
        recordType: datas.recordType,
        contentUrlList: datas.contentUrlList,
        poseIndicatorList: datas.poseIndicatorList,
        nodeId: datas.nodeId,
        createdAt: datas.created_at,
      },
    };
  }
}
