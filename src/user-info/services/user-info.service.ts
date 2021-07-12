import { Injectable } from '@nestjs/common';
import { User } from 'src/auth/repositories/user.entity';
import { Industries } from 'src/industries/repositories/industries.entity';
import { IndustriesRepository } from 'src/industries/repositories/industries.repository';
import { SpecialitiesRepository } from 'src/specialities/repositories/specialities.repository';
import { UserCredentialsDto } from '../dto/user-credentials.dto';
import { UserInfo } from '../repositories/user-info.entity';
import { UserInfoRepository } from '../repositories/user-info.repository';

@Injectable()
export class UserInfoService {
    constructor(private userInfoRepository:UserInfoRepository, 
        private specialitiesRepository:SpecialitiesRepository, private industriesRepository:IndustriesRepository
    ){}

    async addUserInfo(userCredentialsDto: UserCredentialsDto, user:User):Promise<UserInfo>{
        const {name, companyName, phoneNumber, specialities, industries} = userCredentialsDto;

        const userInfo = this.userInfoRepository.create({
            name,
            companyName,
            phoneNumber,
            user_id: user.id,
            specialities,
            industries,
        })
        
        await this.userInfoRepository.save(userInfo);

        return userInfo;
    }

    getUserInfo(id: string):Promise<UserInfo>{
        return this.userInfoRepository.findOne({where:{user_id: id}});
    }
}
