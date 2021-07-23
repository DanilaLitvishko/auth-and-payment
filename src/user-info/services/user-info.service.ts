import { Injectable } from '@nestjs/common';
import { User } from 'src/auth/repositories/user.entity';
import { IndustriesRepository } from 'src/industries/repositories/industries.repository';
import { SpecialitiesRepository } from 'src/specialities/repositories/specialities.repository';
import { ChangeSpecialitiesDto } from '../dto/change-specialities.dto';
import { GetUserInfo } from '../dto/get-user-info.dto';
import { UserCredentialsDto } from '../dto/user-credentials.dto';
import { UserInfo } from '../repositories/user-info.entity';
import { UserInfoRepository } from '../repositories/user-info.repository';

@Injectable()
export class UserInfoService {
    constructor(private userInfoRepository:UserInfoRepository){}

    async addUserInfo(userCredentialsDto: UserCredentialsDto, user:User):Promise<UserInfo>{
        const {name, companyName, phoneNumber, specialities, industries, image} = userCredentialsDto;

        const userInfo = this.userInfoRepository.create({
            name,
            companyName,
            phoneNumber,
            user_id: user.id,
            specialities,
            industries,
            image
        })

        return await this.userInfoRepository.save(userInfo);
    }

    async getUserInfo(user: User):Promise<GetUserInfo>{
        const userInfo: UserInfo = await this.userInfoRepository.findOne({where:{user_id: user.id}});
        const email = user.username;
        const res: GetUserInfo = {
            id: userInfo.id,
            name: userInfo.name,
            phoneNumber: userInfo.phoneNumber,
            companyName: userInfo.companyName,
            specialities: userInfo.specialities,
            industries: userInfo.industries,  
            email,
            image: userInfo.image,
        }
        return res;
    }

    async changeSpecialities(changeSpecialitiesDto:ChangeSpecialitiesDto, user: User):Promise<UserInfo>{
        const {userSpecialities} = changeSpecialitiesDto;
        const userInfo:UserInfo = await this.userInfoRepository.findOne({where:{user_id: user.id}})
        userInfo.specialities = userSpecialities;
        return await this.userInfoRepository.save(userInfo)
    }
}
