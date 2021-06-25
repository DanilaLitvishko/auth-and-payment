import { EntityRepository, Repository } from "typeorm";
import { Specialities } from "./specialities.entity";

@EntityRepository(Specialities)
export class SpecialitiesRepository extends Repository<Specialities>{
    
}