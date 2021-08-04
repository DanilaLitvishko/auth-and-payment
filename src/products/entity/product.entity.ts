import { Exclude } from "class-transformer";
import { User } from "src/auth/repositories/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product{
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column()
    name:string;

    @Column({type: 'real'})
    price:number;

    @Column()
    description:string;

    @Column()
    forSubscribers: boolean
}