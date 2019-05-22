import { Exclude, Expose } from "class-transformer";

@Exclude()
export class DeleteCommentCommand {
    @Expose()
    public commentId: number;
}
