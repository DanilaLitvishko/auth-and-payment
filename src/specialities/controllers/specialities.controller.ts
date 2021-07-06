import { Controller, Get } from '@nestjs/common';
import { Specialities } from '../repositories/specialities.entity';
import { SpecialitiesService } from '../service/specialities.service';

@Controller('specialities')
export class SpecialitiesController {

    constructor(private specialitiesService:SpecialitiesService){}

    @Get()
    getSpecialities():Promise<Specialities []>{
        return this.specialitiesService.getSpecialities()
    }
}
