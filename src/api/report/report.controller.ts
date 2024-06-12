import { Controller, Inject, UseGuards } from '@nestjs/common';
import { Roles } from '@/guard/roles.decorator';
import { GrpcMethod } from '@nestjs/microservices';
import { ReportService } from './report.service';
import { AuthGuard } from '@/guard/auth.guard';
import { RoleGuard } from '@/guard/role.guard';
import { AccountRoles } from '@/model/enum';
import { REPORT_SERVICE_NAME, GetReportsRequest, GetReportRequest, GetReportsResponse } from '@proto/backoffice.pb';

@UseGuards(AuthGuard)
@Controller()
export class ReportController {
  @Inject(ReportService)
  private readonly reportService: ReportService;

  @UseGuards(RoleGuard)
  @Roles(AccountRoles.ADMIN, AccountRoles.MANAGER)
  @GrpcMethod(REPORT_SERVICE_NAME, 'getReports')
  private getReports(payload: GetReportsRequest): Promise<GetReportsResponse> {
    return this.reportService.GetReports(payload);
  }

  @UseGuards(RoleGuard)
  @Roles(AccountRoles.ADMIN, AccountRoles.MANAGER)
  @GrpcMethod(REPORT_SERVICE_NAME, 'getReport')
  private getReport(payload: GetReportRequest): Promise<GetReportsResponse> {
    return this.reportService.GetReport(payload);
  }
}
