import { Injectable } from '@nestjs/common';
import { Industries } from '../repositories/industries.entity';
import { IndustriesRepository } from '../repositories/industries.repository';

@Injectable()
export class IndustriesService {
    constructor(private industriesRepository:IndustriesRepository){}

    getIndustries():Promise<Industries []>{
        return this.industriesRepository.find();
    }
}
