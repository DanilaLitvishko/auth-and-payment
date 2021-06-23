import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Specialities{
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column()
    name:string;
}