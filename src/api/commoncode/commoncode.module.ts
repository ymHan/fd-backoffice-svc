import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonCodeController } from './commoncode.controller';
import { CommonCodeEntity } from '@/model/entities';
import { CommonCodeService } from './commoncode.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtService } from '@/common/service';
import { UserAccountEntity } from '@/model/entities';
import { ItemDetails } from '@/model/entities';

import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '365d' },
    }),
    TypeOrmModule.forFeature([CommonCodeEntity, UserAccountEntity, ItemDetails]),
  ],
  controllers: [CommonCodeController],
  providers: [CommonCodeService, JwtService],
  exports: [CommonCodeService],
})
export class CommonCodeModule {}
