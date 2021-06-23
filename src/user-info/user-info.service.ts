import { Injectable } from '@nestjs/common';
import { UserCredentialsDto } from './dto/user-credentials.dto';
import { UserInfo } from './user-info.entity';
import { UserInfoRepository } from './user-info.repository';

@Injectable()
export class UserInfoService {
    constructor(private userInfoRepository:UserInfoRepository){}

    addUserInfo(userCredentialsDto: UserCredentialsDto):Promise<UserInfo>{
        const {name, companyName, phoneNumber, specialities, industries} = userCredentialsDto;
        const userInfo = this.userInfoRepository.create({
            name,
            companyName,
            phoneNumber,
            specialities,
            industries
        })

        return this.userInfoRepository.save(userInfo);
    }

    getUserInfo(id: string):Promise<UserInfo>{
        return this.userInfoRepository.findOne({where:{user_id: id}});
    }
}
