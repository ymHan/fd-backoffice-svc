import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';
import { ReportEntity } from '@/model/entities';
import { GetReportsRequest, GetReportRequest, GetReportsResponse } from '@proto/backoffice.pb';

@Injectable()
export class ReportService {
  @InjectRepository(ReportEntity)
  private readonly reportRepository: Repository<ReportEntity>;

  public async GetReports(payload: GetReportsRequest): Promise<GetReportsResponse> {
    let { page, limit, sort, order, type, keyword } = payload;

    const queryBuilder = this.reportRepository.createQueryBuilder('reports');
    const [reports, total] = await queryBuilder
      .andWhere(
        new Brackets((qb) => {
          if (type === 'string') {
            qb.andWhere('reports.report LIKE :keyword', { keyword: `%${keyword}%` });
          }
          if (type === 'userid') {
            qb.andWhere('reports.userId = :keyword', { keyword: `${Number(keyword)}` });
          }
          if (type === 'videoid') {
            qb.andWhere('reports.videoId = :keyword', { keyword: `${Number(keyword)}` });
          }
        }),
      )
      .leftJoinAndSelect('reports.commoncode', 'commoncode')
      .skip((page - 1) * limit)
      .orderBy(`reports.${sort}`, order.toUpperCase() as 'ASC' | 'DESC')
      .take(limit)
      .getManyAndCount();

    if (!reports) {
      return {
        result: 'fail',
        status: HttpStatus.NOT_FOUND,
        message: 'reports not found.',
        meta: undefined,
        data: [],
      };
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
      data: reports,
    };
  }
  public async GetReport(payload: GetReportRequest): Promise<GetReportsResponse> {
    const { id } = payload;

    const existsCheck = await this.reportRepository.findOne({ where: { id } });
    if (!existsCheck) {
      return {
        result: 'fail',
        status: HttpStatus.NOT_FOUND,
        message: 'user not found',
        meta: null,
        data: [],
      };
    }

    return {
      result: 'success',
      status: HttpStatus.OK,
      message: 'success',
      meta: null,
      data: [existsCheck],
    };
  }
}
