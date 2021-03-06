import { Exclude, Expose } from "class-transformer";

@Exclude()
export class AddPostCommand {
    @Expose()
    public content: string;

    @Expose()
    public title: string;

    // Allow the controller to set this property.
    public userId: number;
}
