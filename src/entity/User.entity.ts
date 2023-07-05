import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn } from 'typeorm'

@Entity()
export class Users {


    @Column()
    name: string

    @Column()
    email: string

    @Column()
    password: string

    @PrimaryGeneratedColumn("uuid")
    id: string

}

