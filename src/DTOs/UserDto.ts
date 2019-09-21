import { MapProp } from "ts-simple-automapper";

export class UserDto {
    @MapProp()
    public email: number;

    @MapProp()
    public id: number;
}
