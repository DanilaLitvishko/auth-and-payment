import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Industries } from "../industires/industries.entity";
import { IndustriesRepository } from "../industires/industries.repository";
import { Specialities } from "../specialities/specialities.entity";

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

    @ManyToMany(() => Specialities)
    @JoinTable()
    specialities: Specialities[];

    @ManyToMany(() => Industries)
    @JoinTable()
    industries: Industries[];
}