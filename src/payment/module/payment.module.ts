import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/modules/auth.module';
import { UsersRepository } from 'src/auth/repositories/users.repository';

import { PaymentController } from '../controller/payment.controller';
import { PaymentRepository } from '../entity/payment.repository';
import { PaymentService } from '../service/payment.service';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([PaymentRepository, UsersRepository]),
    AuthModule
  ],
  providers: [PaymentService],
  controllers: [PaymentController]
})
export class PaymentModule {}