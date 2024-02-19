import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppVersioning, HistoryAppVersion } from '@model/entities';
import {
  AppVersionCreateRequest,
  AppVersionCreateResponse,
  AppVersionUpdateRequest,
  AppVersionUpdateResponse,
} from '@proto/backoffice.pb';

@Injectable()
export class AppVersionService {
  @InjectRepository(AppVersioning)
  private readonly appVersioningRepository: Repository<AppVersioning>;
  @InjectRepository(HistoryAppVersion)
  private readonly historyAppVersionRepository: Repository<HistoryAppVersion>;

  public async listAppVersion(): Promise<any> {
    const QueryBuilder = this.historyAppVersionRepository.createQueryBuilder('appversioning');
    const appVersioning = await QueryBuilder.select([
      'appversioning.id',
      'appversioning.appName',
      'appversioning.version',
      'appversioning.description',
      'appversioning.platform',
      'appversioning.createdAt',
    ])
      .orderBy('appversioning.createdAt', 'DESC')
      .getMany();

    return {
      result: 'ok',
      status: HttpStatus.OK,
      message: 'App version retrieved successfully',
      data: appVersioning,
    };
  }
  public async getVersion(): Promise<any> {
    const QueryBuilder = this.appVersioningRepository.createQueryBuilder('appversioning');
    const appVersioning = await QueryBuilder.select([
      'appversioning.id',
      'appversioning.appName',
      'appversioning.version',
      'appversioning.description',
      'appversioning.platform',
      'appversioning.createdAt',
    ])
      .orderBy('appversioning.createdAt', 'DESC')
      .getOne();

    return {
      result: 'ok',
      status: HttpStatus.OK,
      message: 'App version retrieved successfully',
      data: appVersioning,
    };
  }

  public async createAppVersion(payload: AppVersionCreateRequest): Promise<AppVersionCreateResponse> {
    const appVersioning: AppVersioning = new AppVersioning();
    const historyAppVersion: HistoryAppVersion = new HistoryAppVersion();

    appVersioning.appName = payload.appName;
    appVersioning.version = payload.version;
    appVersioning.description = payload.description;
    appVersioning.platform = payload.platform;

    historyAppVersion.appName = payload.appName;
    historyAppVersion.version = payload.version;
    historyAppVersion.description = payload.description;

    await this.appVersioningRepository.save(appVersioning);
    await this.historyAppVersionRepository.save(historyAppVersion);

    return {
      result: 'ok',
      status: HttpStatus.CREATED,
      message: 'App version created successfully',
    };
  }

  public async updateAppVersion(payload: AppVersionUpdateRequest): Promise<AppVersionUpdateResponse> {
    const appVersioning = await this.appVersioningRepository.findOne({ where: { id: payload.id } });
    const historyAppVersion: HistoryAppVersion = new HistoryAppVersion();

    appVersioning.appName = payload.appName;
    appVersioning.version = payload.version;
    appVersioning.description = payload.description;
    appVersioning.platform = payload.platform;

    await this.appVersioningRepository.save(appVersioning);

    historyAppVersion.appName = payload.appName;
    historyAppVersion.version = payload.version;
    historyAppVersion.description = payload.description;
    await this.historyAppVersionRepository.save(appVersioning);

    return {
      result: 'ok',
      status: HttpStatus.OK,
      message: 'App version updated successfully',
    };
  }

  public async getAndroidVersion(): Promise<any> {
    const QueryBuilder = this.appVersioningRepository.createQueryBuilder('appversioning');
    const appVersioning = await QueryBuilder.select([
      'appversioning.id',
      'appversioning.appName',
      'appversioning.version',
      'appversioning.description',
      'appversioning.platform',
      'appversioning.createdAt',
    ])
      .where('appversioning.platform = :platform', { platform: 'android' })
      .orderBy('appversioning.createdAt', 'DESC')
      .getOne();

    return {
      result: 'ok',
      status: HttpStatus.OK,
      message: 'App version retrieved successfully',
      data: appVersioning,
    };
  }

  public async getIosVersion(): Promise<any> {
    const QueryBuilder = this.appVersioningRepository.createQueryBuilder('appversioning');
    const appVersioning = await QueryBuilder.select([
      'appversioning.id',
      'appversioning.appName',
      'appversioning.version',
      'appversioning.description',
      'appversioning.platform',
      'appversioning.createdAt',
    ])
      .where('appversioning.platform = :platform', { platform: 'ios' })
      .orderBy('appversioning.createdAt', 'DESC')
      .getOne();

    return {
      result: 'ok',
      status: HttpStatus.OK,
      message: 'App version retrieved successfully',
      data: appVersioning,
    };
  }
}
