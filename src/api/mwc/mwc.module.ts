import { Module } from '@nestjs/common';
import { MwcController } from './mwc.controller';
import { MwcService } from './mwc.service';

@Module({
  imports: [],
  controllers: [MwcController],
  providers: [MwcService],
})
export class MwcModule {}
