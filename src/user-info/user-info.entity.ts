import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserInfo{
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column()
    user_id:string;

    @Column()
    name:string;

    @Column()
    companyName:string;

    @Column()
    phoneNumber:string;

    @Column()
    specialities: string;

    @Column()
    industries: string;
}