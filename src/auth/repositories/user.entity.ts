import { Payment } from "src/payment/entity/payment.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User{
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column({ unique:true })
    username:string;

    @Column()
    password:string;

    @Column({ unique:true })
    confirmationCode: string;

    @Column()
    isConfirm: boolean;

    @Column()
    isSubscribing: boolean;

    @OneToMany(_type => Payment, payment => payment.user, { eager: true })
    payments: Payment[];
}