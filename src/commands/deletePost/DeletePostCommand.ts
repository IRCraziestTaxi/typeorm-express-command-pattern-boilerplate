import { Exclude, Expose } from "class-transformer";

@Exclude()
export class DeletePostCommand {
    // Allow the controller to set this property.
    public postId: number;
}
