import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { MwcService } from '@root/api/mwc/mwc.service';

import {
  MWC_SERVICE_NAME,
  ListMwcResponse,
  GetMwcResponse,
  GetMwcRequest,
  FileDownloadRequest, FileDownloadResponse,
} from '@proto/backoffice.pb';

@Controller()
export class MwcController {
  @Inject(MwcService)
  private readonly mwcService: MwcService;

  @GrpcMethod(MWC_SERVICE_NAME, 'listMwc')
  
  private listMwc(): Promise<ListMwcResponse> {
    return this.mwcService.listMwc();
  }

  @GrpcMethod(MWC_SERVICE_NAME, 'getMwc')
  private getMwc(payload: GetMwcRequest): Promise<GetMwcResponse> {
    return this.mwcService.getMwc(payload);
  }

  @GrpcMethod(MWC_SERVICE_NAME, 'fileDownload')
  private fileDownload(payload: FileDownloadRequest): Promise<FileDownloadResponse> {
    return this.mwcService.fileDownload(payload);
  }
  private getDates() {
    let months = '';
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    if (month < 10) {
      months = `0${month}`;
    }
    const day = date.getDate();
    return `${year}${months}${day}`;
  }
}
