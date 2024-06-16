import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  ListShortSxResponse,
  DeleteShortSxResponse
} from '@proto/backoffice.pb';
import { ivod_process_entity } from '@model/entities/ivod-process.entity';

@Injectable()
export class ShortSxService {
  @InjectRepository(ivod_process_entity)
  private readonly shortSxRepository: Repository<ivod_process_entity>;

  public async listShortSx(): Promise<any> {
    const data = await this.shortSxRepository.find()
    console.log(data);

    return {
      result: 'ok',
      status: 200,
      message: 'success',
      data,
    };
  }

  public async deleteShorSx(payload): Promise<any> {
   await this.shortSxRepository.delete(payload);

    return {
      result: 'ok',
      status: 200,
      message: 'success',
    }
  }
}