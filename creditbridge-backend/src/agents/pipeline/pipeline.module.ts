import { Module } from '@nestjs/common';
import { PipelineService } from './pipeline.service';
import { PipelineController } from './pipeline.controller';
import { HarvestingModule } from '../harvesting/harvesting.module';
import { RiskModule } from '../risk/risk.module';
import { ComplianceModule } from '../compliance/compliance.module';
import { DisbursementModule } from '../disbursement/disbursement.module';

@Module({
  imports: [
    HarvestingModule,
    RiskModule,
    ComplianceModule,
    DisbursementModule,
  ],
  controllers: [PipelineController],
  providers: [PipelineService],
})
export class PipelineModule {}