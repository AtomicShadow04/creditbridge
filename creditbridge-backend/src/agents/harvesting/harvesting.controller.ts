import { Controller, Post, Body, Logger } from '@nestjs/common';
import { HarvestingService } from './harvesting.service';
import { HarvestInputDto } from './dto/harvest.dto';

@Controller('agents/harvest')
export class HarvestingController {
  private readonly logger = new Logger(HarvestingController.name);

  constructor(private readonly harvestingService: HarvestingService) {}

  @Post()
  async harvest(@Body() input: HarvestInputDto) {
    this.logger.log(`Harvest request received for: ${input.businessName}`);
    const profile = await this.harvestingService.harvestSmeProfile(input);
    return {
      success: true,
      agent: 'Data Harvesting Agent',
      data: profile,
    };
  }
}