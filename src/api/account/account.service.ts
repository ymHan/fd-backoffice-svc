import { HttpStatus, Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not, FindOptionsWhere, Equal } from 'typeorm';
import { UserAccountEntity } from '@/model/entities';
import { AccountRoles, AccountStates } from '@/model/enum';
import { JwtService } from '@/common/service';
import { transDateToObject } from '@/common/util';
import { ChannelAccountEntity } from '@/model/entities';
import { UserProfileAccountEntity } from '@/model/entities';
import { VideoEntity } from '@/model/entities';
import { CommonCodeEntity } from '@/model/entities';
import { Social } from '@/model/entities';

import {
  SignInRequest,
  SignInResponse,
  GetUsersRequest,
  GetUsersResponse,
  GetUserRequest,
  GetUserResponse,
  UpdateRequest,
  UpdateResponse,
  GetUserResult,
  UpdateChannelRequest,
  UpdateChannelResponse,
  UpdateProfileRequest,
  UpdateProfileResponse,
  UserUpdateVideoRequest,
  UserDeleteVideoRequest,
  UserVideoResponse,
  UpdateSocialRequest,
  UpdateSocialResponse,
} from '@proto/backoffice.pb';

@Injectable()
export class AccountService {
  @InjectRepository(UserAccountEntity)
  private readonly userRepository: Repository<UserAccountEntity>;
  @InjectRepository(ChannelAccountEntity)
  private readonly channelRepository: Repository<ChannelAccountEntity>;
  @InjectRepository(UserProfileAccountEntity)
  private readonly profileRepository: Repository<UserProfileAccountEntity>;
  @InjectRepository(VideoEntity)
  private readonly videoRepository: Repository<VideoEntity>;
  @InjectRepository(CommonCodeEntity)
  private readonly commonCodeRepository: Repository<CommonCodeEntity>;
  @InjectRepository(Social)
  private readonly socialRepository: Repository<Social>;
  @Inject(JwtService)
  private readonly jwtService: JwtService;

  public async GetUsers(payload: GetUsersRequest): Promise<GetUsersResponse> {
    let { page, limit, sort, order, keyword } = payload;

    const queryBuilder = this.userRepository.createQueryBuilder('users');
    const [users, total] = await queryBuilder
      .where('users.name LIKE :keyword', { keyword: `%${keyword}%` })
      .orWhere('users.nickname LIKE :keyword', { keyword: `%${keyword}%` })
      .orWhere('users.email LIKE :keyword', { keyword: `%${keyword}%` })
      .leftJoinAndSelect('users.profile', 'profile')
      .leftJoinAndSelect('users.channel', 'channel')
      .leftJoinAndSelect('users.videos', 'videos')
      .leftJoinAndSelect('users.socials', 'socials')
      .skip((page - 1) * limit)
      .orderBy(`users.${sort}`, order.toUpperCase() as 'ASC' | 'DESC')
      .take(limit)
      .getManyAndCount();

    if (!users) {
      return {
        result: 'fail',
        status: HttpStatus.NOT_FOUND,
        message: 'users not found.',
        meta: {
          page,
          size: limit,
          total: total,
          sort,
          order,
        },
        data: [],
      };
    }

    const assignUser = Object.assign(users);
    if (assignUser) {
      await assignUser.map((item: any) => {
        item = transDateToObject(item);
      });
    }

    return {
      result: 'success',
      status: HttpStatus.OK,
      message: 'success',
      meta: {
        page,
        size: limit,
        total: total,
        sort,
        order,
      },
      data: assignUser,
    };
  }

  public async GetUser(payload: GetUserRequest): Promise<GetUserResponse> {
    const userData = await this.userRepository.findOne({
      where: { id: payload.id },
      relations: {
        channel: true,
        profile: true,
        socials: {
          user: true,
        },
        videos: {
          category: true,
          categorySub: true,
          categorySubCode: true,
        },
        notis: true,
      },
    });

    if (!userData) {
      return {
        result: 'fail',
        status: HttpStatus.NOT_FOUND,
        message: 'user not found',
        data: [],
      };
    }

    const user = await transDateToObject(userData);
    if (user.videos.length) {
      user.videos.map((item: any, index: number) => {
        item.createdAt = userData.videos[index].createdAt.toISOString();
      });
    }

    if (user?.notis?.length) {
      user.notis.map((item: any) => {
        item.create_at = item.create_at.toISOString();
      });
    }

    return {
      result: 'success',
      status: HttpStatus.OK,
      message: 'success',
      data: [user],
    };
  }

  public async UpdateUser(payload: UpdateRequest): Promise<UpdateResponse> {
    let { id, password, name, nickname, pushreceive, emailreceive, state, usertype, isVerifiedEmail } = payload;

    let userType: AccountRoles, userState: AccountStates;
    if (usertype) userType = AccountRoles[usertype.toUpperCase()];
    if (state) userState = AccountStates[state.toUpperCase()];

    const checkUser = await this.userRepository.findOne({
      where: { id: payload.id },
    });

    if (!checkUser) {
      return {
        result: 'fail',
        status: HttpStatus.NOT_FOUND,
        message: HttpStatus.NOT_FOUND.toString(),
        data: [],
      };
    }

    if (nickname) {
      const checkNick = await this.userRepository.findOne({
        where: { nickname: payload.nickname, id: Not(payload.id) },
      });
      if (checkNick) {
        return {
          result: 'fail',
          status: HttpStatus.CONFLICT,
          message: HttpStatus.CONFLICT.toString(),
          data: [],
        };
      }
    }

    if (password) password = this.jwtService.encodePassword(password);

    const updateUser = await this.userRepository.save({
      id,
      password,
      name,
      nickname,
      pushreceive,
      emailreceive,
      isVerifiedEmail,
      usertype: userType,
      state: userState,
      updatedAt: new Date(),
    });

    return {
      result: 'success',
      status: HttpStatus.OK,
      message: 'success',
      data: [updateUser],
    };
  }

  public async DeleteUser(payload: GetUserRequest): Promise<UpdateResponse> {
    const userData = await this.userRepository.findOne({
      where: { id: payload.id },
    });

    if (!userData) {
      return {
        result: 'fail',
        status: HttpStatus.NOT_FOUND,
        message: 'user not found',
        data: [],
      };
    }

    userData.deletedAt = new Date();
    userData.state = AccountStates.DELETED;
    const updateUser = await this.userRepository.save(userData);

    return {
      result: 'success',
      status: HttpStatus.OK,
      message: 'success',
      data: [updateUser],
    };
  }

  public async findOne(payload: SignInRequest): Promise<UserAccountEntity> {
    return await this.userRepository.findOne({ where: { email: payload.email } });
  }

  public async UpdateProfile(payload: UpdateProfileRequest): Promise<UpdateProfileResponse> {
    const { id, gender, photo } = payload;

    const checkUser = await this.profileRepository.findOne({
      where: { id },
    });

    if (!checkUser) {
      return {
        result: 'fail',
        status: HttpStatus.NOT_FOUND,
        message: HttpStatus.NOT_FOUND.toString(),
        data: [],
      };
    }

    checkUser.gender = gender ? gender : checkUser.gender;
    checkUser.photo = photo ? photo : checkUser.photo;
    const profileUser = await this.profileRepository.save(checkUser);

    return {
      result: 'success',
      status: HttpStatus.OK,
      message: 'success',
      data: [profileUser],
    };
  }

  public async UpdateChannel(payload: UpdateChannelRequest): Promise<UpdateChannelResponse> {
    const { id, channelName, description, channelUrl, link, businessEmail } = payload;

    const checkUser = await this.channelRepository.findOne({
      where: { id },
    });

    if (!checkUser) {
      return {
        result: 'fail',
        status: HttpStatus.NOT_FOUND,
        message: HttpStatus.NOT_FOUND.toString(),
        data: [],
      };
    }

    const channelUser = await this.channelRepository.save({
      id,
      channelName,
      description,
      channelUrl,
      link,
      businessEmail,
    });

    return {
      result: 'success',
      status: HttpStatus.OK,
      message: 'success',
      data: [channelUser],
    };
  }

  public async UpdateVideo(payload: UserUpdateVideoRequest): Promise<UserVideoResponse> {
    const { id, userId } = payload;

    const checkUser = await this.userRepository.findOne({ where: { id: userId } });
    if (!checkUser) {
      return {
        result: 'fail',
        status: HttpStatus.NOT_FOUND,
        message: 'user not found',
        data: undefined,
      };
    }

    const checkExists = await this.videoRepository.findOne({
      where: { id: id },
      relations: {
        user: true,
      },
    });

    if (!checkExists) {
      return {
        result: 'fail',
        status: HttpStatus.NOT_FOUND,
        message: 'video not found',
        data: undefined,
      };
    }

    if (checkExists.user.id !== userId) {
      return {
        result: 'fail',
        status: HttpStatus.BAD_REQUEST,
        message: 'videoId & userId is not matching',
        data: undefined,
      };
    }

    const { title, subTitle, description, duration, category, categorySub, nodeId, isPublic, isStatus, isDeleted } = payload;
    checkExists.title = title;
    checkExists.sub_title = subTitle;
    checkExists.description = description;
    checkExists.duration = duration;
    checkExists.nodeId = nodeId;
    checkExists.isPublic = isPublic;
    checkExists.isStatus = isStatus;
    checkExists.isDeleted = isDeleted;

    const setCategory: CommonCodeEntity = await this.commonCodeRepository.findOne({
      where: { groupCode: 'CTKD', code: category },
    });

    const setSubCateroy: CommonCodeEntity = await this.commonCodeRepository.findOne({
      where: { groupCode: 'ITKD', code: categorySub },
    });

    if (category && setCategory) checkExists.category = setCategory;
    if (categorySub && setSubCateroy) checkExists.categorySub = setSubCateroy;

    const savedVideoInfo = await this.videoRepository.save(checkExists);
    const assignVideoInfo = Object.assign(savedVideoInfo);
    assignVideoInfo.createdAt = savedVideoInfo.createdAt.toISOString();
    assignVideoInfo.updatedAt = savedVideoInfo.updatedAt.toISOString();

    return {
      result: 'success',
      status: HttpStatus.OK,
      message: 'success',
      data: assignVideoInfo,
    };
  }

  public async DeleteVideo(payload: UserDeleteVideoRequest): Promise<UserVideoResponse> {
    const { userid, videoid } = payload;

    const checkUser: UserAccountEntity = await this.userRepository.findOne({ where: { id: userid } });
    if (!checkUser) {
      return {
        result: 'fail',
        status: HttpStatus.NOT_FOUND,
        message: 'user not found',
        data: undefined,
      };
    }

    const whereCondition: FindOptionsWhere<UserAccountEntity>[] = [{ id: Equal(checkUser.id) }];
    const checkVideo = await this.videoRepository.findOne({ where: { id: videoid, user: whereCondition[0] } });
    if (!checkVideo) {
      return {
        result: 'fail',
        status: HttpStatus.NOT_FOUND,
        message: 'video not found',
        data: undefined,
      };
    }

    const deleteVideo = await this.videoRepository.delete({ id: videoid });
    return {
      result: 'success',
      status: HttpStatus.OK,
      message: 'success',
      data: deleteVideo,
    };
  }

  public async UpdateSocial(payload: UpdateSocialRequest): Promise<UpdateSocialResponse> {
    const { id, targetId, providerId } = payload;

    const checkUser = await this.userRepository.findOne({ where: { id } });
    if (!checkUser) {
      return {
        result: 'fail',
        status: HttpStatus.NOT_FOUND,
        message: 'user not found',
        data: undefined,
      };
    }

    const whereCondition: FindOptionsWhere<UserAccountEntity>[] = [{ id: Equal(checkUser.id) }];
    const checkSns = await this.socialRepository.findOne({ where: { id: targetId, user: whereCondition[0] } });
    if (!checkSns) {
      return {
        result: 'fail',
        status: HttpStatus.NOT_FOUND,
        message: 'providerId not found',
        data: undefined,
      };
    }
    checkSns.providerId = providerId;
    const savedSocialInfo = await this.socialRepository.save(checkSns);

    return {
      result: 'success',
      status: HttpStatus.OK,
      message: 'success',
      data: savedSocialInfo,
    };
  }
}
