import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Industries{
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column()
    name:string;
}