import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from '../dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt'
import { UsersRepository } from '../repositories/users.repository';
import { JwtPayload } from '../jwt/jwt-payload.interface';
import { User } from '../repositories/user.entity';
@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UsersRepository)
        private userRepository: UsersRepository,
        private jwtService: JwtService,
    ){}

    async signUp(authCredentialsDto: AuthCredentialsDto):Promise<void>{
        return this.userRepository.createUser(authCredentialsDto)
    }

    async signIn(authCredentialsDto: AuthCredentialsDto):Promise<{ accessToken:string }>{
        const { username, password } = authCredentialsDto;
        const user = await this.userRepository.findOne({ username });

        if(user && (await bcrypt.compare(password, user.password))){
            const payload: JwtPayload = { username };
            const accessToken:string = await this.jwtService.sign(payload)
            return {accessToken};
        }else{
            throw new UnauthorizedException('Please chech your credentials')
        }
    }
}