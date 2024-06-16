import { Controller, Inject, UseGuards } from '@nestjs/common';
import { Roles } from '@/guard/roles.decorator';
import { GrpcMethod } from '@nestjs/microservices';
import { CommonCodeService } from './commoncode.service';
import { AuthGuard } from '@/guard/auth.guard';
import { RoleGuard } from '@/guard/role.guard';
import { AccountRoles } from '@/model/enum';
import {
  COMMON_CODE_SERVICE_NAME,
  GetCommonCodesRequest,
  GetCommonCodeRequest,
  PutCommonCodeRequest,
  CommonCodeResponse,
  ModCommonCodeRequest,
  GetItemDetailRequest,
  GetItemDetailResponse,
} from '@proto/backoffice.pb';

@UseGuards(AuthGuard)
@Controller()
export class CommonCodeController {
  @Inject(CommonCodeService)
  private readonly commoncodeService: CommonCodeService;

  @UseGuards(RoleGuard)
  @Roles(AccountRoles.ADMIN, AccountRoles.MANAGER)
  @GrpcMethod(COMMON_CODE_SERVICE_NAME, 'getCommonCodes')
  private getCommonCodes(): Promise<CommonCodeResponse> {
    return this.commoncodeService.getCommonCodes();
  }

  @UseGuards(RoleGuard)
  @Roles(AccountRoles.ADMIN, AccountRoles.MANAGER)
  @GrpcMethod(COMMON_CODE_SERVICE_NAME, 'getCommonCode')
  private getCommonCode(payload: GetCommonCodeRequest): Promise<CommonCodeResponse> {
    return this.commoncodeService.getCommonCode(payload);
  }
  @UseGuards(RoleGuard)
  @Roles(AccountRoles.ADMIN, AccountRoles.MANAGER)
  @GrpcMethod(COMMON_CODE_SERVICE_NAME, 'putCommonCode')
  private putCommonCode(payload: PutCommonCodeRequest): Promise<CommonCodeResponse> {
    return this.commoncodeService.putCommonCode(payload);
  }

  @UseGuards(RoleGuard)
  @Roles(AccountRoles.ADMIN, AccountRoles.MANAGER)
  @GrpcMethod(COMMON_CODE_SERVICE_NAME, 'delCommonCode')
  private delCommonCode(payload: GetCommonCodeRequest): Promise<CommonCodeResponse> {
    return this.commoncodeService.delCommonCode(payload);
  }

  @UseGuards(RoleGuard)
  @Roles(AccountRoles.ADMIN, AccountRoles.MANAGER)
  @GrpcMethod(COMMON_CODE_SERVICE_NAME, 'modCommonCode')
  private modCommonCode(payload: ModCommonCodeRequest): Promise<CommonCodeResponse> {
    return this.commoncodeService.modCommonCode(payload);
  }

  @UseGuards(RoleGuard)
  @Roles(AccountRoles.ADMIN, AccountRoles.MANAGER)
  @GrpcMethod(COMMON_CODE_SERVICE_NAME, 'getDetailCode')
  private getDetailCode(payload: GetItemDetailRequest): Promise<GetItemDetailResponse> {
    return this.commoncodeService.getDetailCode(payload);
  }
}
