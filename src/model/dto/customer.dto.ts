import { IsNumber, IsString } from 'class-validator';
import { CreateCustomerRequest, ListCustomerRequest, GetCustomerRequest, UpdateCustomerRequest } from '@proto/backoffice.pb';
//import { PrimaryColumn } from 'typeorm';

export class UpdateCustomerRequestDto implements UpdateCustomerRequest {
  @IsString()
  public readonly id: string;

  @IsString()
  public readonly name: string;

  @IsString()
  public readonly description: string;
}

export class GetCustomerRequestDto implements GetCustomerRequest {
  @IsString()
  public readonly id: string;
}

export class CreateCustomerRequestDto implements CreateCustomerRequest {
  @IsString()
  public readonly name: string;

  @IsString()
  public readonly description: string;
}

export class ListCustomerRequestDto implements ListCustomerRequest {
  @IsNumber()
  public readonly page: number;

  @IsNumber()
  public readonly pagesize: number;

  @IsString()
  public readonly sort: string;

  @IsString()
  public readonly order: string;
}
