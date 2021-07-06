import { Body } from '@nestjs/common';
import { Controller, Post } from '@nestjs/common';
import Stripe from 'stripe';
import { PaymentCredentials } from './dto/payment-credetials.dto';

@Controller('payment')
export class PaymentController {
    @Post()
    payment(@Body('paymentCredentials') paymentCredentials:PaymentCredentials){
        const stripe = new Stripe('', {apiVersion: '2020-08-27'})
        stripe.charges.create
    }
}
