import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormConfig = require('./config/ormconfig');
import { ConfigModule } from '@nestjs/config';

import { CustomerModule } from './api/customer/customer.module';
import { VenueModule } from './api/venue/venue.module';
import { SectorModule } from './api/sector/sector.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.prod',
      ignoreEnvFile: process.env.NODE_ENV === 'prod',
    }),
    TypeOrmModule.forRoot(ormConfig[0]),
    CustomerModule,
    VenueModule,
    SectorModule,
  ],
})
export class AppModule {}
