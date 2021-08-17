import { Controller, Get } from '@nestjs/common';
import { Industries } from '../repositories/industries.entity';
import { IndustriesService } from '../service/industries.service';

@Controller('industries')
export class IndustriesController {

    constructor(private industriesService:IndustriesService){}

    @Get()
    getIndustries(): Promise<Industries []>{
        return this.industriesService.getIndustries();
    }
}
