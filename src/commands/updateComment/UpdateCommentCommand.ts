import { Exclude, Expose } from "class-transformer";

@Exclude()
export class UpdateCommentCommand {
    @Expose()
    public comment: string;

    // Allow the controller to set this property.
    public commentId: number;
}
