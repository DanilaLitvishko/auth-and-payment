import { IsPhoneNumber, IsString, MaxLength, MinLength } from "class-validator";
import { Industries } from "src/industries/repositories/industries.entity";
import { Specialities } from "src/specialities/repositories/specialities.entity";
import { UserInfo } from "../repositories/user-info.entity";

export class GetUserInfo{

    id:string;

    @MinLength(4)
    @MaxLength(20)
    @IsString()
    name:string;

    @MinLength(1)
    @MaxLength(30)
    @IsString()
    companyName:string;

    @IsPhoneNumber()
    phoneNumber:string;

    specialities: Specialities[];

    industries: Industries[];

    email: string;

    image: string
}