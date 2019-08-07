import { Exclude, Expose } from "class-transformer";

@Exclude()
export class DeleteCommentCommand {
    // Allow the controller to set this property.
    public commentId: number;
}
