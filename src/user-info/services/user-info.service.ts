import { Injectable } from '@nestjs/common';
import { User } from 'src/auth/repositories/user.entity';
import { UserCredentialsDto } from '../dto/user-credentials.dto';
import { Industries } from '../repositories/industires/industries.entity';
import { IndustriesRepository } from '../repositories/industires/industries.repository';
import { Specialities } from '../repositories/specialities/specialities.entity';
import { SpecialitiesRepository } from '../repositories/specialities/specialities.repository';
import { UserInfo } from '../repositories/user-info/user-info.entity';
import { UserInfoRepository } from '../repositories/user-info/user-info.repository';

@Injectable()
export class UserInfoService {
    constructor(private userInfoRepository:UserInfoRepository, 
        private specialitiesRepository:SpecialitiesRepository, private industriesRepository:IndustriesRepository
    ){}

    async addUserInfo(userCredentialsDto: UserCredentialsDto, user:User):Promise<UserInfo>{
        const {name, companyName, phoneNumber, specialitiesId, industriesId} = userCredentialsDto;

        const industries = await this.industriesRepository.find({where:{id:industriesId}});
        const specialities = await this.specialitiesRepository.find({where:{id:specialitiesId}});

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
