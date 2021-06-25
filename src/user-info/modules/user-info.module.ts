import { Module } from '@nestjs/common';
import { UserInfoService } from '../services/user-info.service';
import { UserInfoController } from '../controllers/user-info.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserInfoRepository } from '../repositories/user-info/user-info.repository';
import { IndustriesRepository } from '../repositories/industires/industries.repository';
import { SpecialitiesRepository } from '../repositories/specialities/specialities.repository';
import { AuthModule } from 'src/auth/modules/auth.module';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([IndustriesRepository, SpecialitiesRepository,UserInfoRepository]),
    AuthModule,
  ],
  providers: [UserInfoService],
  controllers: [UserInfoController]
})
export class UserInfoModule {}
