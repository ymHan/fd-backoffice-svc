import { Controller, Inject, UseGuards } from '@nestjs/common';
import { Roles } from '@/guard/roles.decorator';
import { GrpcMethod } from '@nestjs/microservices';
import { DashBoardService } from './dashboard.service';
import { AuthGuard } from '@/guard/auth.guard';
import { RoleGuard } from '@/guard/role.guard';
import { AccountRoles } from '@/model/enum';
import { DASH_BOARD_SERVICE_NAME, GetDashBoardAllRequest, GetDashBoardAllResponse } from '@proto/backoffice.pb';

@UseGuards(AuthGuard)
@Controller()
export class DashBoardController {
  @Inject(DashBoardService)
  private readonly reportService: DashBoardService;

  @UseGuards(RoleGuard)
  @Roles(AccountRoles.ADMIN, AccountRoles.MANAGER)
  @GrpcMethod(DASH_BOARD_SERVICE_NAME, 'getDashBoardAll')
  private getDashBoardAll(payload: GetDashBoardAllRequest): Promise<GetDashBoardAllResponse> {
    return this.reportService.GetDashBoardAll(payload);
  }
}
