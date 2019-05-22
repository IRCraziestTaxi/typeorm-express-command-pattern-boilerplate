import { Exclude, Expose } from "class-transformer";

@Exclude()
export class DeletePostCommand {
    @Expose()
    public postId: number;
}
