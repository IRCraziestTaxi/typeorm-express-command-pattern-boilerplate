import { nameof } from "ts-simple-nameof";
import { Handler, ICommandHandler } from "tsmediator";
import { LinqRepository } from "typeorm-linq-repository";
import { User } from "../../entities/User";
import { GenericResponse } from "../../helpers/GenericResponse";
import { Rejection } from "../../helpers/Rejection";
import { CommandResult } from "../../types/CommandResult";
import { DeleteUserCommand } from "./DeleteUserCommand";

@Handler(DeleteUserHandler.type)
export class DeleteUserHandler implements ICommandHandler<DeleteUserCommand, Promise<CommandResult<boolean>>> {
    public static get type(): string {
        return nameof(DeleteUserHandler);
    }

    public async Handle(request: DeleteUserCommand): Promise<CommandResult<boolean>> {
        try {
            const success = await new LinqRepository(User).delete(request.userId);

            return new GenericResponse(success);
        }
        catch (error) {
            return new Rejection(error);
        }
    }

    public Validate(request: DeleteUserCommand): void {
        if (!(request.userId > 0)) {
            throw Rejection.BadRequest("Invalid user ID.");
        }
    }
}
