import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import {
  APP_VERSION_SERVICE_NAME,
  AppVersionCreateRequest,
  AppVersionCreateResponse,
  AppVersionUpdateRequest,
  AppVersionUpdateResponse,
  GetVersionResponse,
  ListVersionResponse,
} from '@proto/backoffice.pb';

import { AppVersionService } from './appversion.service';

@Controller()
export class AppVersionController {
  @Inject(AppVersionService)
  private readonly appVersionService: AppVersionService;

  @GrpcMethod(APP_VERSION_SERVICE_NAME, 'listVersion')
  private listVersion(): Promise<ListVersionResponse> {
    return this.appVersionService.listAppVersion();
  }

  @GrpcMethod(APP_VERSION_SERVICE_NAME, 'getVersion')
  private getVersion(): Promise<GetVersionResponse> {
    return this.appVersionService.getVersion();
  }

  @GrpcMethod(APP_VERSION_SERVICE_NAME, 'createVersion')
  private createVersion(payload: AppVersionCreateRequest): Promise<AppVersionCreateResponse> {
    return this.appVersionService.createAppVersion(payload);
  }

  @GrpcMethod(APP_VERSION_SERVICE_NAME, 'updateVersion')
  private updateVersion(payload: AppVersionUpdateRequest): Promise<AppVersionUpdateResponse> {
    return this.appVersionService.updateAppVersion(payload);
  }

  @GrpcMethod(APP_VERSION_SERVICE_NAME, 'getAndroidVersion')
  private getAndroidVersion(): Promise<GetVersionResponse> {
    return this.appVersionService.getAndroidVersion();
  }

  @GrpcMethod(APP_VERSION_SERVICE_NAME, 'getIosVersion')
  private getIosVersion(): Promise<GetVersionResponse> {
    return this.appVersionService.getIosVersion();
  }
}
