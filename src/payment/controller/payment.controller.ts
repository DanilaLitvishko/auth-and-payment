import { Body, Get, Post, UseGuards } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/dto/get-user.decorators';
import { User } from 'src/auth/repositories/user.entity';
import { CheckUserRoleGuard } from 'src/guards/check-user-role.guard';
import { CreatePaymentDto } from '../dto/create-payment.dto';
import { Payment } from '../entity/payment.entity';
import { PaymentService } from '../service/payment.service';

@Controller('payment')
@UseGuards(AuthGuard())
export class PaymentController {

    constructor(private paymentService: PaymentService){}

    @Get()
    payment(@GetUser() user: User):Promise<Payment[]>{
        return this.paymentService.getPayments(user)
    }

    @Post()
    @UseGuards(CheckUserRoleGuard)
    createPayment(@GetUser() user: User, @Body() createPayment: CreatePaymentDto):Promise<Payment>{
        return this.paymentService.createPayment(user, createPayment);
    }

    @Get('status')
    getSubcriptionStatus(@GetUser() user: User):Promise<boolean>{
        return this.paymentService.getSubscriptionStatus(user);
    }

    @Post('status')
    changeSubscriptionStatus(@GetUser() user: User):Promise<User>{
        return this.paymentService.changeSubscriptionStatus(user);
    }
}
