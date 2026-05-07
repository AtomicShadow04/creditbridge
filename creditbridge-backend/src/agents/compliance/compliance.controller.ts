import { Controller, Post, Body, Logger } from '@nestjs/common';
import { ComplianceService } from './compliance.service';
import { ComplianceInputDto } from './dto/compliance.dto';

@Controller('agents/compliance')
export class ComplianceController {
  private readonly logger = new Logger(ComplianceController.name);

  constructor(private readonly complianceService: ComplianceService) {}

  @Post()
  async check(@Body() input: ComplianceInputDto) {
    this.logger.log(`Compliance check for: ${input.riskScore.businessName}`);
    const result = await this.complianceService.runCompliance(input);
    return {
      success: true,
      agent: 'Compliance / KYC Agent',
      data: result,
    };
  }
}