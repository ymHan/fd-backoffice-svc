import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportController } from './report.controller';
import { UserAccountEntity } from '@/model/entities';
import { ReportService } from './report.service';
import { CommonCodeEntity } from '@/model/entities';
import { ReportEntity } from '@/model/entities';
import { JwtService } from '@/common/service';

import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '365d' },
    }),
    TypeOrmModule.forFeature([ReportEntity, UserAccountEntity, CommonCodeEntity]),
  ],
  controllers: [ReportController],
  providers: [ReportService, JwtService],
  exports: [ReportService],
})
export class ReportModule {}
