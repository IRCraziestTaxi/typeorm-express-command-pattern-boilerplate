import { Exclude, Expose } from "class-transformer";

@Exclude()
export class AddCommentCommand {
    @Expose()
    public comment: string;

    @Expose()
    public postId: number;

    @Expose()
    public userId: number;
}
