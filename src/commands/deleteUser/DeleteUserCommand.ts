import { Exclude, Expose } from "class-transformer";

@Exclude()
export class DeleteUserCommand {
    // Allow the controller to set this property.
    public userId: number;
}
