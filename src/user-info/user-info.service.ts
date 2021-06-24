import { Injectable } from '@nestjs/common';
import { User } from 'src/auth/user.entity';
import { UserCredentialsDto } from './dto/user-credentials.dto';
import { Industries } from './industires/industries.entity';
import { IndustriesRepository } from './industires/industries.repository';
import { Specialities } from './specialities/specialities.entity';
import { SpecialitiesRepository } from './specialities/specialities.repository';
import { UserInfo } from './user-info.entity';
import { UserInfoRepository } from './user-info.repository';

@Injectable()
export class UserInfoService {
    constructor(private userInfoRepository:UserInfoRepository, 
        private specialitiesRepository:SpecialitiesRepository, private industriesRepository:IndustriesRepository){}

    async addUserInfo(userCredentialsDto: UserCredentialsDto, user:User):Promise<UserInfo>{
        const {name, companyName, phoneNumber, specialities, industries} = userCredentialsDto;

        const userInfo = this.userInfoRepository.create({
            name,
            companyName,
            phoneNumber,
            user_id: user.id,
        })

        await this.userInfoRepository.save(userInfo);

        const specialitiesNote = this.specialitiesRepository.create({
            name: specialities,
            userInfo
        })

        const industriesNote = this.industriesRepository.create({
            name: industries,
            userInfo
        })

        await this.specialitiesRepository.save(specialitiesNote)
        await this.industriesRepository.save(industriesNote)

        userInfo.industries = await this.industriesRepository.find({where:{userInfo}});
        userInfo.specialities = await this.specialitiesRepository.find({where:{userInfo}});

        return userInfo;
    }

    getUserInfo(id: string):Promise<UserInfo>{
        return this.userInfoRepository.findOne({where:{user_id: id}});
    }
}
