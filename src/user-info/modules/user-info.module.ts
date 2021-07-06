import { Module } from '@nestjs/common';
import { UserInfoService } from '../services/user-info.service';
import { UserInfoController } from '../controllers/user-info.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserInfoRepository } from '../repositories/user-info.repository';
import { IndustriesRepository } from '../../industries/repositories/industries.repository'
import { AuthModule } from 'src/auth/module/auth.module';
import { SpecialitiesRepository } from 'src/specialities/repositories/specialities.repository';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([IndustriesRepository, SpecialitiesRepository, UserInfoRepository]),
    AuthModule,
  ],
  providers: [UserInfoService],
  controllers: [UserInfoController]
})
export class UserInfoModule {}
