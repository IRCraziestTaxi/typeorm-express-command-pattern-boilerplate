import { Exclude, Expose } from "class-transformer";

@Exclude()
export class UpdateCommentCommand {
    @Expose()
    public comment: string;

    @Expose()
    public commentId: number;
}
