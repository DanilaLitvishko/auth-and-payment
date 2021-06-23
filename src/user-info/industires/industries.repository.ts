import { EntityRepository, Repository } from "typeorm";
import { Industries } from "./industries.entity";

@EntityRepository(Industries)
export class IndustriesRepository extends Repository<Industries>{
    
}