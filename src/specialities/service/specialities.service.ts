import { Injectable } from '@nestjs/common';
import { Specialities } from '../repositories/specialities.entity';
import { SpecialitiesRepository } from '../repositories/specialities.repository';

@Injectable()
export class SpecialitiesService {

    constructor(private specialitiesRepository:SpecialitiesRepository){}

    async getSpecialities():Promise<Specialities []>{
        return this.specialitiesRepository.find();
    }
}
