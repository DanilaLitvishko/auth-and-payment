import { Industries } from "src/industries/repositories/industries.entity";
import { Specialities } from "src/specialities/repositories/specialities.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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

    @ManyToMany(() => Specialities, {cascade:true})
    @JoinTable()
    specialities: Specialities[];

    @ManyToMany(() => Industries, {cascade:true})
    @JoinTable()
    industries: Industries[];
}