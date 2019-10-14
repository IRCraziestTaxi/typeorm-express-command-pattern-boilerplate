import { CommandResult, GenericResponse, Rejection } from "@responsekit/core";
import { Mapper } from "ts-simple-automapper";
import { nameof } from "ts-simple-nameof";
import { Handler, ICommandHandler } from "tsmediator";
import { LinqRepository } from "typeorm-linq-repository";
import { User } from "../../entities/User";
import { AddUserCommand } from "./AddUserCommand";

@Handler(AddUserHandler.type)
export class AddUserHandler implements ICommandHandler<AddUserCommand, Promise<CommandResult<number>>> {
    public static get type(): string {
        return nameof(AddUserHandler);
    }

    public async Handle(request: AddUserCommand): Promise<CommandResult<number>> {
        try {
            const addUser = new Mapper().map(request, new User());

            const createdUser = await new LinqRepository(User).create(addUser);

            return new GenericResponse({
                value: createdUser.id
            });
        }
        catch (error) {
            return new Rejection(error);
        }
    }

    public Validate(request: AddUserCommand): void {
        if (!request.email) {
            throw Rejection.BadRequest("Email is required.");
        }
    }
}
