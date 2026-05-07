import { Controller, Post, Body, Logger } from '@nestjs/common';
import { DisbursementService } from './disbursement.service';
import { DisbursementInputDto } from './dto/disbursement.dto';

@Controller('agents/disburse')
export class DisbursementController {
  private readonly logger = new Logger(DisbursementController.name);

  constructor(private readonly disbursementService: DisbursementService) {}

  @Post()
  async disburse(@Body() input: DisbursementInputDto) {
    this.logger.log(`Disbursement request for: ${input.complianceResult.businessName}`);
    const result = await this.disbursementService.disburse(input);
    return {
      success: true,
      agent: 'Disbursement Agent',
      data: result,
    };
  }
}