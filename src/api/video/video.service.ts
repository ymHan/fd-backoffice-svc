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
  V1ListVideoRequest,
  V1ListVideoResponse,
  V1DeleteVideoRequest,
  V1DeleteVideoResponse,
} from '@proto/backoffice.pb';

@Injectable()
export class VideoService {
  @InjectRepository(Video)
  private readonly videoRepository: Repository<Video>;

  public async V1DeleteVideo(payload: V1DeleteVideoRequest): Promise<any> {
    const video = await this.videoRepository.findOne({ where: { id: payload.id } });
    if (!video) {
      return {
        result: 'fail',
        status: 404,
        message: 'Video not found',
        data: null,
      };
    }
    await this.videoRepository.delete({ id: payload.id });
    return {
      result: 'success',
      status: 200,
      message: 'Video deleted successfully',
      data: null,
    };
  }

  public async V1ListVideo(payload: V1ListVideoRequest): Promise<any> {
    const basicMeta = {
      page: payload.page || 1,
      limit: payload.limit || 10,
      sort: payload.sort || 'created_at',
      order: payload.order || 'DESC',
    };

    const queryBuilder = this.videoRepository.createQueryBuilder('video');
    const [videos, total] = await queryBuilder
      .select([
        'video.id',
        'video.email',
        'video.title',
        'video.subTitle',
        'video.subTitle',
        'video.description',
        'video.ownerName',
        'video.ownerNickName',
        'video.ownerChannelName',
        'video.ownerProfileIconUrl',
        'video.thumbnailUrl',
        'video.viewCount',
        'video.reportCount',
        'video.likesCount',
        'video.duration',
        'video.category',
        'video.categorySub',
        'video.categorySubCode',
        'video.recordType',
        'video.contentUrlList',
        'video.poseIndicatorList',
        'video.nodeId',
        'video.createdAt',
      ])
      .skip((basicMeta.page - 1) * basicMeta.limit)
      .take(basicMeta.limit)
      .getManyAndCount();


    const meta = Object.assign(basicMeta, {
      totalCount: total,
      totalPage: Math.ceil(total / basicMeta.limit),
    });

    return {
      result: 'success',
      status: 200,
      message: 'Video list retrieved successfully',
      meta: meta,
      data: videos,
    };
  }
  public async V1GetVideo(payload: V1GetVideoRequest): Promise<any> {
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
      data: video,
    };
  }

  public async V1CreateVideo(payload: V1CreateVideoRequest): Promise<any> {
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
      data: datas
    };
  }
}
