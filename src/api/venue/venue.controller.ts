import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { CreateVenueRequestDto, GetVenueRequestDto, ListVenueRequestDto, UpdateVenueRequestDto } from '@model/dto/venue.dto';
import {
  B_O__VENUE__SERVICE_NAME,
  CreateVenueResponse,
  GetVenueResponse,
  ListVenueResponse,
  UpdateVenueResponse,
} from '@proto/backoffice.pb';
import { VenueService } from './venue.service';

@Controller()
export class VenueController {
  @Inject(VenueService)
  private readonly venueService: VenueService;

  @GrpcMethod(B_O__VENUE__SERVICE_NAME, 'createVenue')
  private createVenue(payload: CreateVenueRequestDto): Promise<CreateVenueResponse> {
    return this.venueService.CreateVenue(payload);
  }

  @GrpcMethod(B_O__VENUE__SERVICE_NAME, 'getVenue')
  private getVenue(payload: GetVenueRequestDto): Promise<GetVenueResponse> {
    return this.venueService.GetVenue(payload);
  }

  @GrpcMethod(B_O__VENUE__SERVICE_NAME, 'listVenue')
  private listVenue(payload: ListVenueRequestDto): Promise<ListVenueResponse> {
    return this.venueService.ListVenue(payload);
  }

  @GrpcMethod(B_O__VENUE__SERVICE_NAME, 'updateVenue')
  private updateVenue(payload: UpdateVenueRequestDto): Promise<UpdateVenueResponse> {
    return this.venueService.UpdateVenue(payload);
  }
}
