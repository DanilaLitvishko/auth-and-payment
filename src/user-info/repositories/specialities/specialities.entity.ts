import { Exclude } from "class-transformer";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserInfo } from "../user-info/user-info.entity";

@Entity()
export class Specialities{
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column()
    name:string;
}