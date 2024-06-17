import { Controller, Inject, UseGuards } from '@nestjs/common';
import { Roles } from '@/guard/roles.decorator';
import { GrpcMethod } from '@nestjs/microservices';
import { AccountService } from './account.service';
import { AuthGuard } from '@/guard/auth.guard';
import { RoleGuard } from '@/guard/role.guard';
import { AccountRoles } from '@/model/enum';
import {
  ACCOUNT_SERVICE_NAME,
  GetUsersRequest,
  GetUsersResponse,
  GetUserRequest,
  GetUserResponse,
  UpdateRequest,
  UpdateResponse,
  UpdateProfileRequest,
  UpdateProfileResponse,
  UserUpdateVideoRequest,
  UserDeleteVideoRequest,
  UserVideoResponse,
  UpdateSocialRequest,
  UpdateSocialResponse,
  UpdateChannelRequest,
  UpdateChannelResponse,
} from '@proto/backoffice.pb';

@UseGuards(AuthGuard)
@Controller()
export class AccountController {
  @Inject(AccountService)
  private readonly accountService: AccountService;

  @UseGuards(RoleGuard)
  @Roles(AccountRoles.ADMIN, AccountRoles.MANAGER)
  @GrpcMethod(ACCOUNT_SERVICE_NAME, 'getUsers')
  private getUsers(payload: GetUsersRequest): Promise<GetUsersResponse> {
    return this.accountService.GetUsers(payload);
  }

  @UseGuards(RoleGuard)
  @Roles(AccountRoles.ADMIN, AccountRoles.MANAGER)
  @GrpcMethod(ACCOUNT_SERVICE_NAME, 'getUser')
  private getUser(payload: GetUserRequest): Promise<GetUserResponse> {
    return this.accountService.GetUser(payload);
  }

  @UseGuards(RoleGuard)
  @Roles(AccountRoles.ADMIN, AccountRoles.MANAGER)
  @GrpcMethod(ACCOUNT_SERVICE_NAME, 'updateUser')
  private updateUser(payload: UpdateRequest): Promise<UpdateResponse> {
    return this.accountService.UpdateUser(payload);
  }

  @UseGuards(RoleGuard)
  @Roles(AccountRoles.ADMIN, AccountRoles.MANAGER)
  @GrpcMethod(ACCOUNT_SERVICE_NAME, 'deleteUser')
  private deleteUser(payload: GetUserRequest): Promise<UpdateResponse> {
    return this.accountService.DeleteUser(payload);
  }

  @UseGuards(RoleGuard)
  @Roles(AccountRoles.ADMIN, AccountRoles.MANAGER)
  @GrpcMethod(ACCOUNT_SERVICE_NAME, 'updateProfile')
  private updateProfile(payload: UpdateProfileRequest): Promise<UpdateProfileResponse> {
    return this.accountService.UpdateProfile(payload);
  }

  @UseGuards(RoleGuard)
  @Roles(AccountRoles.ADMIN, AccountRoles.MANAGER)
  @GrpcMethod(ACCOUNT_SERVICE_NAME, 'updateChannel')
  private updateChannel(payload: UpdateChannelRequest): Promise<UpdateChannelResponse> {
    return this.accountService.UpdateChannel(payload);
  }

  @UseGuards(RoleGuard)
  @Roles(AccountRoles.ADMIN, AccountRoles.MANAGER)
  @GrpcMethod(ACCOUNT_SERVICE_NAME, 'updateVideo')
  private updateVideo(payload: UserUpdateVideoRequest): Promise<UserVideoResponse> {
    return this.accountService.UpdateVideo(payload);
  }

  @UseGuards(RoleGuard)
  @Roles(AccountRoles.ADMIN, AccountRoles.MANAGER)
  @GrpcMethod(ACCOUNT_SERVICE_NAME, 'deleteVideo')
  private deleteVideo(payload: UserDeleteVideoRequest): Promise<UserVideoResponse> {
    return this.accountService.DeleteVideo(payload);
  }

  @UseGuards(RoleGuard)
  @Roles(AccountRoles.ADMIN, AccountRoles.MANAGER)
  @GrpcMethod(ACCOUNT_SERVICE_NAME, 'updateSocial')
  private updateSocial(payload: UpdateSocialRequest): Promise<UpdateSocialResponse> {
    return this.accountService.UpdateSocial(payload);
  }
}
