import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { MwcService } from '@root/api/mwc/mwc.service';

import {
  MWC_SERVICE_NAME,
  ListMwcResponse,
} from '@proto/backoffice.pb';

@Controller()
export class MwcController {
  @Inject(MwcService)
  private readonly mwcService: MwcService;

  @GrpcMethod(MWC_SERVICE_NAME, 'listMwc')
  private listMwc(): Promise<ListMwcResponse> {
    return this.mwcService.listMwc();
  }
}
