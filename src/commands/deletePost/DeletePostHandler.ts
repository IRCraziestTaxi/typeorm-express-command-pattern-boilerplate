import { CommandResult, GenericResponse, Rejection } from "@responsekit/core";
import { nameof } from "ts-simple-nameof";
import { ICommandHandler } from "tsmediator";
import { LinqRepository } from "typeorm-linq-repository";
import { Post } from "../../entities/Post";
import { DeletePostCommand } from "./DeletePostCommand";

export class DeletePostHandler implements ICommandHandler<DeletePostCommand, Promise<CommandResult<boolean>>> {
    public static get type(): string {
        return nameof(DeletePostHandler);
    }

    public async Handle(request: DeletePostCommand): Promise<CommandResult<boolean>> {
        try {
            const success = await new LinqRepository(Post).delete(request.postId);

            return new GenericResponse({
                value: success
            });
        }
        catch (error) {
            return new Rejection(error);
        }
    }

    public Validate(request: DeletePostCommand): void {
        if (!(request.postId > 0)) {
            throw Rejection.BadRequest("Invalid post ID.");
        }
    }
}
