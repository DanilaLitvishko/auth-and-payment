import { Module } from '@nestjs/common';
import { IndustriesService } from '../service/industries.service';
import { IndustriesController } from '../controllers/industries.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IndustriesRepository } from '../repositories/industries.repository';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([IndustriesRepository]),
  ],
  controllers: [IndustriesController],
  providers: [IndustriesService],
})
export class IndustriesModule {}
