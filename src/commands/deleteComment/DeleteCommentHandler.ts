import { nameof } from "ts-simple-nameof";
import { ICommandHandler } from "tsmediator";
import { LinqRepository } from "typeorm-linq-repository";
import { Comment } from "../../entities/Comment";
import { GenericResponse } from "../../helpers/GenericResponse";
import { Rejection } from "../../helpers/Rejection";
import { CommandResult } from "../../types/CommandResult";
import { DeleteCommentCommand } from "./DeleteCommentCommand";

export class DeleteCommentHandler implements ICommandHandler<DeleteCommentCommand, Promise<CommandResult<boolean>>> {
    public static get type(): string {
        return nameof(DeleteCommentHandler);
    }

    public async Handle(request: DeleteCommentCommand): Promise<CommandResult<boolean>> {
        try {
            const success = await new LinqRepository(Comment).delete(request.commentId);

            return new GenericResponse(success);
        }
        catch (error) {
            return new Rejection(error);
        }
    }

    public Validate(request: DeleteCommentCommand): void {
        if (!(request.commentId > 0)) {
            throw Rejection.BadRequest("Invalid comment ID.");
        }
    }
}
