import { Module } from '@nestjs/common';
import { SpecialitiesController } from '../controllers/specialities.controller'
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpecialitiesRepository } from '../repositories/specialities.repository'
import { SpecialitiesService } from '../service/specialities.service';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([SpecialitiesRepository]),
  ],
  providers: [SpecialitiesService],
  controllers: [SpecialitiesController]
})
export class SpecialitiesModule {}
