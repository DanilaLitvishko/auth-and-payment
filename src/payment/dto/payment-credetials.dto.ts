import { IsCreditCard } from "class-validator";

export class PaymentCredentials{
    @IsCreditCard()
    cardNumber:string;

    cartHolderName;
    expiryDate;
    cvv;
}