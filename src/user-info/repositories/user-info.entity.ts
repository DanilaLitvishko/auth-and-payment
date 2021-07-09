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

    @ManyToMany(() => Specialities)
    @JoinTable()
    specialities: Specialities[];

    @ManyToMany(() => Industries)
    @JoinTable()
    industries: Industries[];
}