import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/repositories/user.entity';
import { UsersRepository } from 'src/auth/repositories/users.repository';
import { CreatePaymentDto } from '../dto/create-payment.dto';
import { Payment } from '../entity/payment.entity';
import { PaymentRepository } from '../entity/payment.repository';

@Injectable()
export class PaymentService {

    constructor(
        @InjectRepository(PaymentRepository)
        private paymentRepository: PaymentRepository,
        @InjectRepository(UsersRepository)
        private usersRepository: UsersRepository
    ){}

    getPayments(user: User):Promise<Payment[]>{
        return this.paymentRepository.find({where:{user:user}})
    }

    async createPayment(user: User, createPayment: CreatePaymentDto):Promise<Payment>{
        const payment:Payment = await this.paymentRepository.create({user, date: createPayment.date})
        return this.paymentRepository.save(payment)        
    }

    async getSubscriptionStatus(user: User):Promise<boolean>{
        const {isSubscribing} = await this.usersRepository.findOne({where:{id:user.id}})
        return  isSubscribing;
    }

    async changeSubscriptionStatus(user: User):Promise<User>{
        user.isSubscribing = !user.isSubscribing;
        return this.usersRepository.save(user);
    }
}
