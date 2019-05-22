import { MapProp } from "ts-simple-automapper";

export class PostDto {
    @MapProp()
    public content: string;

    @MapProp()
    public id: number;

    @MapProp()
    public title: string;

    @MapProp()
    public userId: number;
}
