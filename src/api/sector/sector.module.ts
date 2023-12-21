import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Sector } from '@model/entities/sector.entity';
import { Venue } from '@model/entities/venue.entity';

import { SectorController } from './sector.controller';
import { SectorService } from './sector.service';

@Module({
  imports: [TypeOrmModule.forFeature([Sector, Venue])],
  controllers: [SectorController],
  providers: [SectorService],
})
export class SectorModule {}
