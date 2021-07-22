import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/dto/get-user.decorators';
import { User } from 'src/auth/repositories/user.entity';
import { ChangeSpecialitiesDto } from '../dto/change-specialities.dto';
import { GetUserInfo } from '../dto/get-user-info.dto';
import { UserCredentialsDto } from '../dto/user-credentials.dto';
import { UserInfo } from '../repositories/user-info.entity';
import { UserInfoService } from '../services/user-info.service';

@Controller('user-info')
@UseGuards(AuthGuard())
export class UserInfoController {
    constructor(private userInfoService: UserInfoService){}

    @Post()
    addUserInfo(@Body() userCredentialsDto: UserCredentialsDto, @GetUser() user:User):Promise<UserInfo>{
        return this.userInfoService.addUserInfo(userCredentialsDto, user);
    }

    @Get()
    getUserInfo(@GetUser() user:User):Promise<GetUserInfo>{
        return this.userInfoService.getUserInfo(user);
    }

    @Post('specialities')
    changeSpecialities(@Body() changeSpecialitiesDto:ChangeSpecialitiesDto):Promise<UserInfo>{
        return this.userInfoService.changeSpecialities(changeSpecialitiesDto);
    }
}
