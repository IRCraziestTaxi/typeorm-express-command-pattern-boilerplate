import { MapProp } from "ts-simple-automapper";

export class UserDto {
    @MapProp()
    public id: number;

    @MapProp()
    public email: number;
}
