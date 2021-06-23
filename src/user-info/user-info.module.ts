import { Module } from '@nestjs/common';
import { UserInfoService } from './user-info.service';
import { UserInfoController } from './user-info.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UserInfoRepository } from './user-info.repository';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([UserInfoRepository]),
    AuthModule,
  ],
  providers: [UserInfoService],
  controllers: [UserInfoController]
})
export class UserInfoModule {}
