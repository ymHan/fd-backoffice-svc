import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormConfig = require('./config/ormconfig');
import { ConfigModule } from '@nestjs/config';

import { CustomerModule } from './api/customer/customer.module';
import { VenueModule } from './api/venue/venue.module';
import { SectorModule } from './api/sector/sector.module';
import { CategoryModule } from './api/category/category.module';
import { MwcModule } from './api/mwc/mwc.module';
import { VideoModule } from '@root/api/video/video.module';
import { AppVersionModule } from './api/appversioning/appversion.module';
import { AccountModule } from './api/account/account.module';
import { AuthModule } from './api/auth/auth.module';
import { CommonCodeModule } from './api/commoncode/commoncode.module';
import { ReportModule } from './api/report/report.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'dev' ? '.dev.env' : '.prod.env',
      ignoreEnvFile: process.env.NODE_ENV === 'prod',
    }),
    TypeOrmModule.forRoot(ormConfig[0]),
    CustomerModule,
    VenueModule,
    SectorModule,
    CategoryModule,
    MwcModule,
    VideoModule,
    AppVersionModule,
    AccountModule,
    AuthModule,
    CommonCodeModule,
    ReportModule,
  ],
})
export class AppModule {}
