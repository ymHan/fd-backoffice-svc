import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import {
  CreateCustomerRequestDto,
  GetCustomerRequestDto,
  ListCustomerRequestDto,
  UpdateCustomerRequestDto,
} from '@model/dto/customer.dto';
import {
  B_O__CUSTOMER__SERVICE_NAME,
  CreateCustomerResponse,
  GetCustomerResponse,
  ListCustomerResponse,
  UpdateCustomerResponse,
} from '@proto/backoffice.pb';
import { CustomerService } from './customer.service';

@Controller()
export class CustomerController {
  @Inject(CustomerService)
  private readonly customerService: CustomerService;

  @GrpcMethod(B_O__CUSTOMER__SERVICE_NAME, 'createCustomer')
  private createCustomer(payload: CreateCustomerRequestDto): Promise<CreateCustomerResponse> {
    return this.customerService.CreateCustomer(payload);
  }

  @GrpcMethod(B_O__CUSTOMER__SERVICE_NAME, 'getCustomer')
  private getCustomer(payload: GetCustomerRequestDto): Promise<GetCustomerResponse> {
    return this.customerService.GetCustomer(payload);
  }

  @GrpcMethod(B_O__CUSTOMER__SERVICE_NAME, 'listCustomer')
  private listCustomer(payload: ListCustomerRequestDto): Promise<ListCustomerResponse> {
    return this.customerService.ListCustomer(payload);
  }

  @GrpcMethod(B_O__CUSTOMER__SERVICE_NAME, 'updateCustomer')
  private updateCustomer(payload: UpdateCustomerRequestDto): Promise<UpdateCustomerResponse> {
    return this.customerService.UpdateCustomer(payload);
  }
}
