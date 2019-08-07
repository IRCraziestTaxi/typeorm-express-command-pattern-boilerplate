import { Exclude, Expose } from "class-transformer";

@Exclude()
export class AddCommentCommand {
    @Expose()
    public comment: string;

    // Allow the controller to set this property.
    public postId: number;

    @Expose()
    public userId: number;
}
