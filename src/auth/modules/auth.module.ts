
import { Module } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthController } from '../controllers/auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../jwt/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersRepository } from '../repositories/users.repository';
import { UserInfoRepository } from 'src/user-info/repositories/user-info.repository';

@Module({
  imports:[
    ConfigModule,
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject:[ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions:{
          expiresIn: 3600,
        },
      })
    }),
    TypeOrmModule.forFeature([UsersRepository, UserInfoRepository])
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [JwtStrategy, PassportModule]
})

export class AuthModule {}