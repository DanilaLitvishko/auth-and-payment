import { Injectable } from '@nestjs/common';
import { User } from 'src/auth/repositories/user.entity';
import { UserCredentialsDto } from '../dto/user-credentials.dto';
import { IndustriesRepository } from '../../industries/repositories/industries.repository';
import { UserInfo } from '../repositories/user-info.entity';
import { UserInfoRepository } from '../repositories/user-info.repository';
import { SpecialitiesRepository } from 'src/specialities/repositories/specialities.repository';

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
