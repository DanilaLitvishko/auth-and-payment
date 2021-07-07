import { IsString, Matches, MaxLength, MinLength } from "class-validator";
import { User } from "src/auth/repositories/user.entity";

export class UserDto{

    constructor(user:User){
        this.id = user.id;
        this.username = user.username;
        this.password = user.password;
        this.confirmationCode = user.confirmationCode;
        this.isConfirm = user.isConfirm;
    }

    @IsString()
    id:string;

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username:string;

    @IsString()
    @MinLength(8)
    @MaxLength(32)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'password is too weak' })
    password:string;

    @IsString()
    confirmationCode:string;

    @IsString()
    isConfirm:boolean;
}