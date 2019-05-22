import { MapProp } from "ts-simple-automapper";

export class CommentDto {
    @MapProp()
    public comment: string;

    @MapProp()
    public id: number;

    @MapProp()
    public postId: number;

    @MapProp()
    public userId: number;
}
