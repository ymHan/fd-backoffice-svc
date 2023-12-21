import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { CreateSectorRequestDto, GetSectorRequestDto, ListSectorRequestDto, UpdateSectorRequestDto } from '@model/dto/sector.dto';
import {
  B_O__SECTOR__SERVICE_NAME,
  CreateSectorResponse,
  GetSectorResponse,
  ListSectorResponse,
  UpdateSectorResponse,
} from '@proto/backoffice.pb';
import { SectorService } from './sector.service';

@Controller()
export class SectorController {
  @Inject(SectorService)
  private readonly sectorService: SectorService;

  @GrpcMethod(B_O__SECTOR__SERVICE_NAME, 'createSector')
  private createSector(payload: CreateSectorRequestDto): Promise<CreateSectorResponse> {
    return this.sectorService.CreateSector(payload);
  }

  @GrpcMethod(B_O__SECTOR__SERVICE_NAME, 'getSector')
  private getSector(payload: GetSectorRequestDto): Promise<GetSectorResponse> {
    return this.sectorService.GetSector(payload);
  }

  @GrpcMethod(B_O__SECTOR__SERVICE_NAME, 'listSector')
  private listSector(payload: ListSectorRequestDto): Promise<ListSectorResponse> {
    return this.sectorService.ListSector(payload);
  }

  @GrpcMethod(B_O__SECTOR__SERVICE_NAME, 'updateSector')
  private updateSector(payload: UpdateSectorRequestDto): Promise<UpdateSectorResponse> {
    return this.sectorService.UpdateSector(payload);
  }
}
