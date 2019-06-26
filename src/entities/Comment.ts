import { Ignore, MapFrom, MapProp } from "ts-simple-automapper";
import { nameof } from "ts-simple-nameof";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { AddCommentCommand } from "../commands/addComment/AddCommentCommand";
import { Post } from "./Post";
import { User } from "./User";

@Entity()
export class Comment {
    @MapProp()
    @Column({ nullable: false })
    public comment: string;

    @Ignore()
    @PrimaryGeneratedColumn()
    public id: number;

    @Ignore()
    @ManyToOne(() => Post)
    @JoinColumn({ name: nameof<Comment>(c => c.postId) })
    public post: Post;

    @Ignore()
    @MapFrom(() => AddCommentCommand)
    @Column({ nullable: false })
    public postId: number;

    @Ignore()
    @ManyToOne(() => User)
    @JoinColumn({ name: nameof<Comment>(c => c.userId) })
    public user: User;

    @Ignore()
    @MapFrom(() => AddCommentCommand)
    @Column({ nullable: false })
    public userId: number;
}
