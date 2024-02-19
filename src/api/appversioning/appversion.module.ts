import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppVersionController } from './appversion.controller';
import { AppVersionService } from './appversion.service';
import { AppVersioning, HistoryAppVersion } from '@model/entities';

@Module({
  imports: [TypeOrmModule.forFeature([AppVersioning, HistoryAppVersion])],
  controllers: [AppVersionController],
  providers: [AppVersionService],
})
export class AppVersionModule {}
