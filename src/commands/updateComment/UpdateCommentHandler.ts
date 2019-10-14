import { CommandResult, GenericResponse, Rejection } from "@responsekit/core";
import { Mapper } from "ts-simple-automapper";
import { nameof } from "ts-simple-nameof";
import { Handler, ICommandHandler } from "tsmediator";
import { LinqRepository } from "typeorm-linq-repository";
import { Comment } from "../../entities/Comment";
import { UpdateCommentCommand } from "./UpdateCommentCommand";

@Handler(UpdateCommentHandler.type)
export class UpdateCommentHandler implements ICommandHandler<UpdateCommentCommand, Promise<CommandResult<boolean>>> {
    public static get type(): string {
        return nameof(UpdateCommentHandler);
    }

    public async Handle(request: UpdateCommentCommand): Promise<CommandResult<boolean>> {
        try {
            const commentRepository = new LinqRepository(Comment);

            const comment = await commentRepository.getById(request.commentId);

            if (!comment) {
                return Rejection.NotFound("comment");
            }

            new Mapper().map(request, comment);

            await commentRepository.update(comment);

            return new GenericResponse({
                value: true
            });
        }
        catch (error) {
            return new Rejection(error);
        }
    }

    public Validate(request: UpdateCommentCommand): void {
        if (!request.comment.trim()) {
            throw Rejection.BadRequest("Comment cannot be empty.");
        }

        if (!(request.commentId > 0)) {
            throw Rejection.BadRequest("Invalid comment ID.");
        }
    }
}
