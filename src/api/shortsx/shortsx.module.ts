import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ivod_process_entity } from '@model/entities';

import { ShortSxController } from './shortsx.controller';
import { ShortSxService } from './shortsx.service';


@Module({
  imports: [TypeOrmModule.forFeature([ivod_process_entity])],
  controllers: [ShortSxController],
  providers: [ShortSxService],
})
export class ShortSxModule {}