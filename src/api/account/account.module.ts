import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountController } from './account.controller';
import { UserAccountEntity } from '@/model/entities';
import { AccountService } from './account.service';
import { ChannelAccountEntity } from '@/model/entities';
import { UserProfileAccountEntity } from '@/model/entities';
import { VideoEntity } from '@/model/entities';
import { CommonCodeEntity } from '@/model/entities';
import { Social } from '@/model/entities';
import { JwtService } from '@/common/service';

import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '365d' },
    }),
    TypeOrmModule.forFeature([
      UserAccountEntity,
      ChannelAccountEntity,
      UserProfileAccountEntity,
      VideoEntity,
      CommonCodeEntity,
      Social,
    ]),
  ],
  controllers: [AccountController],
  providers: [AccountService, JwtService],
  exports: [AccountService],
})
export class AccountModule {}
