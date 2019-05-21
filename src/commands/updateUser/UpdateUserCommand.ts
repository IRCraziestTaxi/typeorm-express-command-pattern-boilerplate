import { Exclude, Expose } from "class-transformer";

// Ignore all other properties from an incoming JSON request.
@Exclude()
export class UpdateUserCommand {
    // Map the "email" property from the incoming JSON request.
    @Expose()
    public email: string;

    // Map the "userId" property from the incoming JSON request.
    @Expose()
    public userId: number;
}
