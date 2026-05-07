import { Controller, Post, Body, Logger } from '@nestjs/common';
import { PipelineService } from './pipeline.service';

export class PipelineInputDto {
  businessName!: string;
  phoneNumber!: string;
  bvn!: string;
  businessRegNumber!: string;
  requestedLoanAmount!: number;
  recipientWalletAddress!: string;
}

@Controller('agents/pipeline')
export class PipelineController {
  private readonly logger = new Logger(PipelineController.name);

  constructor(private readonly pipelineService: PipelineService) {}

  @Post()
  async run(@Body() input: PipelineInputDto) {
    this.logger.log(`Pipeline triggered for: ${input.businessName}`);
    const result = await this.pipelineService.runFullPipeline(input);
    return {
      success: true,
      agent: 'CreditBridge Pipeline',
      data: result,
    };
  }
}