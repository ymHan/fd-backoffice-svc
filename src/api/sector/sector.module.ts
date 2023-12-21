import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SectorController } from './sector.controller';
import { Sector } from '@model/entities/sector.entity';
import { SectorService } from './sector.service';

@Module({
  imports: [TypeOrmModule.forFeature([Sector])],
  controllers: [SectorController],
  providers: [SectorService],
})
export class SectorModule {}
