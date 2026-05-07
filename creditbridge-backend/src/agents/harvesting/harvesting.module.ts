import { Module } from '@nestjs/common';
import { HarvestingService } from './harvesting.service';
import { HarvestingController } from './harvesting.controller';

@Module({
  controllers: [HarvestingController],
  providers: [HarvestingService],
  exports: [HarvestingService],
})
export class HarvestingModule {}