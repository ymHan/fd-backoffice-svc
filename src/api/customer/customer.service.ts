import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateCustomerRequestDto,
  GetCustomerRequestDto,
  ListCustomerRequestDto,
  UpdateCustomerRequestDto,
} from '@model/dto/customer.dto';
import { Customer } from '@model/entities/customer.entity';
import { CreateCustomerResponse, GetCustomerResponse, ListCustomerResponse, UpdateCustomerResponse } from '@proto/backoffice.pb';

@Injectable()
export class CustomerService {
  @InjectRepository(Customer)
  private readonly customerRepository: Repository<Customer>;

  private async makeCustomerId(): Promise<string> {
    const customerCount: number = await this.customerRepository.count();
    return `${(customerCount + 1).toString().padStart(4, '0')}`;
  }

  //고객사 정보 입력
  public async CreateCustomer({ name, description }: CreateCustomerRequestDto): Promise<CreateCustomerResponse> {
    const customerId: string = await this.makeCustomerId();
    const customer: Customer = new Customer();

    customer.id = customerId;
    customer.name = name;
    customer.description = description;
    customer.isActivation = false;
    customer.isDeleted = false;

    await this.customerRepository.save(customer);

    return {
      status: HttpStatus.CREATED,
      error: null,
      result: {
        id: customerId,
      },
    };
  }

  public async GetCustomer({ id }: GetCustomerRequestDto): Promise<GetCustomerResponse> {
    const customer: Customer = await this.customerRepository.findOne({ where: { id } });

    if (!customer) {
      return {
        status: HttpStatus.NOT_FOUND,
        result: null,
        error: ['고객사 정보가 존재하지 않습니다.'],
      };
    }

    return {
      status: HttpStatus.OK,
      result: {
        customer: {
          id: customer.id,
          name: customer.name,
          description: customer.description,
          createdAt: customer.createdAt.toISOString(),
          updatedAt: customer.updatedAt?.toISOString(),
        },
      },
      error: null,
    };
  }

  public async ListCustomer({ page, pagesize, sort, order }: ListCustomerRequestDto): Promise<ListCustomerResponse> {
    !sort ? (sort = 'id') : (sort = sort.toLowerCase());
    !order ? (order = 'DESC') : (order = order.toUpperCase());
    const [customers, totalCount] = await this.customerRepository.findAndCount({
      skip: (page - 1) * pagesize,
      take: pagesize,
      order: {
        [sort]: order,
      },
    });

    return {
      status: HttpStatus.OK,
      totalCount,
      page,
      lastPage: Math.ceil(totalCount / pagesize),
      result: {
        customers: customers.map((customer) => ({
          id: customer.id,
          name: customer.name,
          description: customer.description,
          createdAt: customer.createdAt.toISOString(),
          updatedAt: customer.updatedAt?.toISOString(),
        })),
      },
      error: null,
    };
  }

  public async UpdateCustomer({ id, name, description }: UpdateCustomerRequestDto): Promise<UpdateCustomerResponse> {
    const customer: Customer = await this.customerRepository.findOne({ where: { id } });

    if (!customer) {
      return {
        status: HttpStatus.NOT_FOUND,
        error: ['고객사 정보가 존재하지 않습니다.'],
      };
    }

    customer.name = name;
    customer.description = description;
    customer.updatedAt = new Date();

    await this.customerRepository.save(customer);

    return {
      status: HttpStatus.OK,
      error: null,
    };
  }
}
