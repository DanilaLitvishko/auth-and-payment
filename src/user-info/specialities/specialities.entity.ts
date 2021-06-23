import { Exclude } from "class-transformer";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserInfo } from "../user-info.entity";

@Entity()
export class Specialities{
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column()
    name:string;

    @ManyToOne(_type => UserInfo, userInfo => userInfo.specialities, {eager: false})
    @Exclude({ toPlainOnly:true })
    userInfo:UserInfo;
}