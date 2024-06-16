import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import {
  BACKOFFICE__SHORTS_X__SERVICE_NAME,
  DeleteShortSxResponse,
  ListShortSxResponse,
} from '@proto/backoffice.pb';
import { ShortSxService } from './shortsx.service';

@Controller()
export class ShortSxController {
  @Inject(ShortSxService) private readonly shortSxService: ShortSxService;

  @GrpcMethod(BACKOFFICE__SHORTS_X__SERVICE_NAME, 'listShortSx')
  private listShortSx(): Promise<any> {
    return this.shortSxService.listShortSx();
  }

  @GrpcMethod(BACKOFFICE__SHORTS_X__SERVICE_NAME, 'deleteShortSx')
  private deleteShortSx(payload): Promise<DeleteShortSxResponse> {
    return this.shortSxService.deleteShorSx(payload);
  }
}