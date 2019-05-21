import { Exclude, Expose } from "class-transformer";

// Ignore all other properties from an incoming JSON request.
@Exclude()
export class DeleteUserCommand {
    // Map the "userId" property from the incoming JSON request.
    @Expose()
    public userId: number;
}
