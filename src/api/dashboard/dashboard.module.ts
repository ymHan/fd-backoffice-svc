import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashBoardController } from './dashboard.controller';
import { UserAccountEntity } from '@/model/entities';
import { DashBoardService } from './dashboard.service';
import { CommonCodeEntity } from '@/model/entities';
import { ReportEntity } from '@/model/entities';
import { JwtService } from '@/common/service';
import { VideoEntity } from '@/model/entities';
import { Social } from '@/model/entities';

import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '365d' },
    }),
    TypeOrmModule.forFeature([ReportEntity, UserAccountEntity, CommonCodeEntity, VideoEntity, Social]),
  ],
  controllers: [DashBoardController],
  providers: [DashBoardService, JwtService],
  exports: [DashBoardService],
})
export class DashBoardModule {}
