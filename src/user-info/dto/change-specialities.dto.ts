import { Specialities } from "src/specialities/repositories/specialities.entity";

export class ChangeSpecialitiesDto{
    
    userInfoId: string;

    userSpecialities: Specialities[];
}