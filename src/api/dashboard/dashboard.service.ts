import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, MoreThan, Repository } from 'typeorm';
import { GetDashBoardAllRequest, GetDashBoardAllResponse } from '@proto/backoffice.pb';
import { VideoEntity } from '@/model/entities';
import { UserAccountEntity } from '@/model/entities';
import { ReportEntity } from '@/model/entities';
import { getBeforeDay, getBeforeMonth } from '@/common/util';
import { Social } from '@/model/entities';

@Injectable()
export class DashBoardService {
  @InjectRepository(UserAccountEntity)
  private readonly userAccountRepository: Repository<UserAccountEntity>;

  @InjectRepository(VideoEntity)
  private readonly videoRepository: Repository<VideoEntity>;

  @InjectRepository(ReportEntity)
  private readonly reportRepository: Repository<ReportEntity>;

  @InjectRepository(Social)
  private readonly socialRepository: Repository<Social>;

  public async GetDashBoardAll(payload: GetDashBoardAllRequest): Promise<GetDashBoardAllResponse> {
    const beforeAWeek = await getBeforeDay(7);
    const beforeMonth = await getBeforeMonth(1);
    const beforeThreeMonth = await getBeforeMonth(3);

    const totalUser = await this.userAccountRepository.find();

    if (!totalUser) {
      return {
        result: 'fail',
        status: HttpStatus.NOT_FOUND,
        message: 'users not found.',
        data: [],
      };
    }

    const totalUserCount = totalUser.length;
    const activeUser = totalUser.filter((item) => {
      return item.state === 'active';
    });
    const totalActiveCount = activeUser.length;

    const snsUserGroup = await this.socialRepository
      .createQueryBuilder('social')
      .select('social.provider')
      .addSelect('COUNT(provider) AS Count')
      .addSelect('COUNT(provider) / SUM(COUNT(provider)) over () * 100 percent')
      .groupBy('social.provider')
      .orderBy('Count', 'DESC')
      .getRawMany();

    const allUsersData = await this.userAccountRepository.find({
      where: {
        createdAt: MoreThan(beforeThreeMonth),
      },
      select: {
        id: true,
        state: true,
        createdAt: true,
        socials: {
          provider: true,
        },
      },
      relations: {
        socials: true,
      },
      order: {
        id: 'ASC',
      },
    });

    const cloneUsers = Object.assign(allUsersData);
    cloneUsers.map((item: any) => {
      item.createdAt = item.createdAt.toISOString();
    });

    const totalVideoCount = await this.videoRepository.count();
    const beforeThreeMonthVideo = await this.videoRepository.find({
      where: {
        createdAt: MoreThan(beforeThreeMonth),
      },
      select: {
        id: true,
        createdAt: true,
      },
    });
    const cloneVideos = Object.assign(beforeThreeMonthVideo);
    cloneVideos.map((item: any) => {
      item.createdAt = item.createdAt.toISOString();
    });

    const totalReportCount = await this.reportRepository.count();
    const beforeThreeMonthReport = await this.reportRepository.find({
      where: {
        createdAt: MoreThan(beforeThreeMonth),
      },
      select: {
        id: true,
        createdAt: true,
      },
    });
    const cloneReports = Object.assign(beforeThreeMonthReport);
    cloneReports.map((item: any) => {
      item.createdAt = item.createdAt.toISOString();
    });

    const returnData = {
      totalUserCount,
      totalActiveCount,
      snsUserGroup,
      usersData: cloneUsers,
      totalVideoCount,
      videoData: cloneVideos,
      totalReportCount,
      reportData: cloneReports,
    };

    return {
      result: 'success',
      status: HttpStatus.OK,
      message: 'success',
      data: [returnData],
    };
  }
}
