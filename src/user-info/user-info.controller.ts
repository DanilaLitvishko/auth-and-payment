import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/dto/get-user.decorators';
import { User } from 'src/auth/user.entity';
import { UserCredentialsDto } from './dto/user-credentials.dto';
import { UserInfo } from './user-info.entity';
import { UserInfoService } from './user-info.service';

@Controller('user-info')
@UseGuards(AuthGuard())
export class UserInfoController {
    constructor(private userInfoService: UserInfoService){}

    @Post()
    addUserInfo(@Body() userCredentialsDto: UserCredentialsDto, @GetUser() user:User):Promise<UserInfo>{
        return this.userInfoService.addUserInfo(userCredentialsDto, user);
    }

    @Get()
    getUserInfo(@Param('id') id, @GetUser() user:User):Promise<UserInfo>{
        return this.userInfoService.getUserInfo(id);
    }
}
