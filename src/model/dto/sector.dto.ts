import { IsNumber, IsString } from 'class-validator';
import {
  CreateSectorRequest,
  ListSectorRequest,
  GetSectorRequest,
  UpdateSectorRequest,
  DeleteSectorRequest,
} from '@proto/backoffice.pb';

export class CreateSectorRequestDto implements CreateSectorRequest {
  @IsString()
  public readonly customerId: string;

  @IsString()
  public readonly venueId: string;

  @IsString()
  public readonly name: string;

  @IsString()
  public readonly description: string;
}

export class ListSectorRequestDto implements ListSectorRequest {
  @IsNumber()
  public readonly page: number;

  @IsNumber()
  public readonly pagesize: number;

  @IsString()
  public readonly sort: string;

  @IsString()
  public readonly order: string;
}

export class GetSectorRequestDto implements GetSectorRequest {
  @IsString()
  public readonly id: string;
}

export class UpdateSectorRequestDto implements UpdateSectorRequest {
  @IsString()
  public readonly id: string;

  @IsString()
  public readonly customerId: string;

  @IsString()
  public readonly venueId: string;

  @IsString()
  public readonly name: string;

  @IsString()
  public readonly description: string;
}

export class DeleteSectorRequestDto implements DeleteSectorRequest {
  @IsString()
  public readonly id: string;
}
