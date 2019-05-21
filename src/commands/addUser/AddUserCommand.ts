import { Exclude, Expose } from "class-transformer";

// Ignore all other properties from an incoming JSON request.
@Exclude()
export class AddUserCommand {
    // Map the "email" property from the incoming JSON request.
    @Expose()
    public email: string;
}
