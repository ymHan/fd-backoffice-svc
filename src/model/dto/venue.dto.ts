import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import {
  CreateVenueRequest,
  GetVenueRequest,
  ListVenueRequest,
  UpdateVenueRequest,
  DeleteVenueRequest,
} from '@proto/backoffice.pb';

export class CreateVenueRequestDto implements CreateVenueRequest {
  public readonly id: string;

  public readonly customerId: string;

  public readonly sportsId: string;

  public readonly countryId: number;

  public readonly stateId: number;

  public readonly cityId: number;

  public readonly name: string;

  public readonly description: string;
}

export class GetVenueRequestDto implements GetVenueRequest {
  public readonly id: string;
}

export class ListVenueRequestDto implements ListVenueRequest {
  public readonly page: number;

  public readonly pagesize: number;

  public readonly sort: string;

  public readonly order: string;
}

export class UpdateVenueRequestDto implements UpdateVenueRequest {
  public readonly id: string;

  public readonly customerId: string;

  public readonly sportsId: string;

  public readonly countryId: number;

  public readonly stateId: number;

  public readonly cityId: number;

  public readonly name: string;

  public readonly description: string;
}

export class DeleteVenueRequestDto implements DeleteVenueRequest {
  public readonly id: string;
}
