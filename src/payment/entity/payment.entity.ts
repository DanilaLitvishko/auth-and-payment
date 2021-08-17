import { Exclude } from "class-transformer";
import { User } from "src/auth/repositories/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Payment{
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column()
    date:string;

    @ManyToOne(_type => User, user => user.payments, {eager: false})
    @Exclude({ toPlainOnly:true })
    user:User;
}