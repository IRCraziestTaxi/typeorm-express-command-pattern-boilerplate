import { Exclude, Expose } from "class-transformer";

@Exclude()
export class UpdatePostCommad {
    @Expose()
    public content: string;

    @Expose()
    public postId: number;

    @Expose()
    public title: string;
}
