import { Module } from '@nestjs/common';
import { UserInfoService } from '../services/user-info.service';
import { UserInfoController } from '../controllers/user-info.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/modules/auth.module';
import { IndustriesRepository } from 'src/industries/repositories/industries.repository';
import { SpecialitiesRepository } from 'src/specialities/repositories/specialities.repository';
import { UserInfoRepository } from '../repositories/user-info.repository';

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
