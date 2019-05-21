import { Mapper } from "ts-simple-automapper";
import { nameof } from "ts-simple-nameof";
import { Handler, ICommandHandler } from "tsmediator";
import { LinqRepository } from "typeorm-linq-repository";
import { User } from "../../entities/User";
import { GenericResponse } from "../../helpers/GenericResponse";
import { Rejection } from "../../helpers/Rejection";
import { CommandResult } from "../../types/CommandResult";
import { UpdateUserCommand } from "./UpdateUserCommand";

@Handler(UpdateUserHandler.type)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand, Promise<CommandResult<boolean>>> {
    public static get type(): string {
        return nameof(UpdateUserHandler);
    }

    public async Handle(request: UpdateUserCommand): Promise<CommandResult<boolean>> {
        try {
            const userRepository = new LinqRepository(User);

            const user = await userRepository.getById(request.userId);

            if (!user) {
                return Rejection.NotFound("user");
            }

            new Mapper().map(request, user);

            await userRepository.update(user);

            return new GenericResponse(true);
        }
        catch (error) {
            return new Rejection(error);
        }
    }

    public Validate(request: UpdateUserCommand): void {
        if (!request.email) {
            throw Rejection.BadRequest("Email is required.");
        }

        if (!(request.userId > 0)) {
            throw Rejection.BadRequest("Invalid user ID.");
        }
    }
}
