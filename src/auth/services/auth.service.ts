import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from '../dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt'
import { UsersRepository } from '../repositories/users.repository';
import { JwtPayload } from '../jwt/jwt-payload.interface';
import { User } from '../repositories/user.entity';
import { UserInfoRepository } from 'src/user-info/repositories/user-info.repository';
import { UserInfo } from 'src/user-info/repositories/user-info.entity';
@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UsersRepository)
        private userRepository: UsersRepository,
        private jwtService: JwtService,
        @InjectRepository(UserInfoRepository)
        private userInfoRepository: UserInfoRepository,
    ){}

    async signUp(authCredentialsDto: AuthCredentialsDto):Promise<void>{
        return this.userRepository.createUser(authCredentialsDto)
    }

    async signIn(authCredentialsDto: AuthCredentialsDto):Promise<{ name:string, accessToken:string }>{
        const { username, password } = authCredentialsDto;
        const user:User = await this.userRepository.findOne({ username });

        if(!user.isConfirm){
            throw new UnauthorizedException('Please confirm your email')
        }

        if(user && (await bcrypt.compare(password, user.password))){
            const payload: JwtPayload = { username };
            const accessToken:string = await this.jwtService.sign(payload)
            const userInfo: UserInfo = await this.userInfoRepository.findOne({where:{user_id: user.id}})
            let name = 'Anonymous';
            if(userInfo){
                name = userInfo.name
            }
            return {name, accessToken};
        }else{
            throw new UnauthorizedException('Please check your credentials')
        }
    }
}
