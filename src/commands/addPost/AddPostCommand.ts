import { Exclude, Expose } from "class-transformer";

@Exclude()
export class AddPostCommand {
    @Expose()
    public content: string;

    @Expose()
    public title: string;

    @Expose()
    public userId: number;
}
