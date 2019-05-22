import { Ignore, MapProp } from "ts-simple-automapper";
import { nameof } from "ts-simple-nameof";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Comment } from "./Comment";
import { User } from "./User";

@Entity()
export class Post {
    @Ignore()
    @OneToMany(() => Comment, c => c.post)
    public comments: Comment[];

    @MapProp()
    @Column({ length: 4000, nullable: false })
    public content: string;

    @Ignore()
    @PrimaryGeneratedColumn()
    public id: number;

    @MapProp()
    @Column({ length: 200, nullable: false })
    public title: string;

    @Ignore()
    @ManyToOne(() => User)
    @JoinColumn({ name: nameof<Post>(p => p.userId) })
    public user: User;

    @Ignore()
    @Column({ nullable: false })
    public userId: number;
}
