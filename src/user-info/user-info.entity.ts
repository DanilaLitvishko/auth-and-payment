import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Industries } from "./industires/industries.entity";
import { Specialities } from "./specialities/specialities.entity";

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

    @OneToMany(_type => Specialities, specialities => specialities.userInfo, { eager: true })
    specialities: Specialities[];

    @OneToMany(_type => Industries, industries => industries.userInfo, { eager: true })
    industries: Industries[];
}