import { Ignore, MapProp } from "ts-simple-automapper";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Comment } from "./Comment";
import { Post } from "./Post";

@Entity()
export class User {
    @Ignore()
    @OneToMany(() => Comment, c => c.user)
    public comments: Comment[];

    // Map email from commands to create/update users.
    @MapProp()
    @Column({ length: 300, nullable: false, unique: true })
    public email: string;

    // Avoid mapping ID to existing users.
    @Ignore()
    @PrimaryGeneratedColumn()
    public id: number;

    @Ignore()
    @OneToMany(() => Post, p => p.user)
    public posts: Post[];
}
