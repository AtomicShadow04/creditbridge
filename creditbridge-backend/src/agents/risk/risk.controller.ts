import { Controller, Post, Body, Logger } from '@nestjs/common';
import { RiskService } from './risk.service';
import { SmeProfileDto } from '../harvesting/dto/harvest.dto';

@Controller('agents/risk')
export class RiskController {
  private readonly logger = new Logger(RiskController.name);

  constructor(private readonly riskService: RiskService) {}

  @Post()
  async score(@Body() profile: SmeProfileDto) {
    this.logger.log(`Risk score request for: ${profile.businessName}`);
    const score = await this.riskService.scoreSme(profile);
    return {
      success: true,
      agent: 'Risk Scoring Agent',
      data: score,
    };
  }
}