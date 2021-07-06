import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from 'src/auth/repositories/users.repository';
import { ConfirmRegistrationController } from '../controllers/confirm-registration.controller';
import { ConfirmRegistrationService } from '../services/confirm-registration.service';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([UsersRepository]),
  ],
  controllers: [ConfirmRegistrationController],
  providers: [ConfirmRegistrationService]
})
export class ConfirmRegistrationModule {}
