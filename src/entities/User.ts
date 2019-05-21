import { Ignore, MapProp } from "ts-simple-automapper";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    // Map email from commands to create/update users.
    @MapProp()
    @Column({ nullable: false })
    public email: string;

    // Do not map ID to existing users.
    @Ignore()
    @PrimaryGeneratedColumn()
    public id: number;
}
