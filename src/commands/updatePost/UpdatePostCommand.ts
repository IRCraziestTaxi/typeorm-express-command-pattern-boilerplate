import { Exclude, Expose } from "class-transformer";

@Exclude()
export class UpdatePostCommad {
    @Expose()
    public content: string;

    // Allow the controller to set this property.
    public postId: number;

    @Expose()
    public title: string;
}
