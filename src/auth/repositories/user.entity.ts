import { Payment } from "src/payment/entity/payment.entity";
import { Product } from "src/products/entity/product.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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

    @Column()
    isAdmin: boolean;

    @OneToMany(_type => Payment, payment => payment.user, { eager: true })
    payments: Payment[];

    @ManyToMany(() => Product, {cascade:true, eager: true})
    @JoinTable()
    products: Product[];
}