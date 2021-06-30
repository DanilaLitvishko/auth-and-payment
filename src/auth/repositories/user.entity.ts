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
}