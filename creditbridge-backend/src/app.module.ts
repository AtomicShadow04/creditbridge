import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HarvestingModule } from './agents/harvesting/harvesting.module';
import { RiskModule } from './agents/risk/risk.module';
import { ComplianceModule } from './agents/compliance/compliance.module';
import { DisbursementModule } from './agents/disbursement/disbursement.module';
import { PipelineModule } from './agents/pipeline/pipeline.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    HarvestingModule,
    RiskModule,
    ComplianceModule,
    DisbursementModule,
    PipelineModule,
  ],
})
export class AppModule {}