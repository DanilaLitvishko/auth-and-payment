import { IsArray, IsIBAN, IsPhoneNumber, IsString, MaxLength, MinLength } from "class-validator";

export class UserCredentialsDto{
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

    @IsString()
    specialitiesId: string;

    @IsString()
    industriesId: string;
}