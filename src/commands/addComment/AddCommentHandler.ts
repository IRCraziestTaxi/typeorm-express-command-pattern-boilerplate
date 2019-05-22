import { Mapper } from "ts-simple-automapper";
import { nameof } from "ts-simple-nameof";
import { Handler, ICommandHandler } from "tsmediator";
import { LinqRepository } from "typeorm-linq-repository";
import { Comment } from "../../entities/Comment";
import { GenericResponse } from "../../helpers/GenericResponse";
import { Rejection } from "../../helpers/Rejection";
import { CommandResult } from "../../types/CommandResult";
import { AddCommentCommand } from "./AddCommentCommand";

@Handler(AddCommentHandler.type)
export class AddCommentHandler implements ICommandHandler<AddCommentCommand, Promise<CommandResult<number>>> {
    public static get type(): string {
        return nameof(AddCommentHandler);
    }

    public async Handle(request: AddCommentCommand): Promise<CommandResult<number>> {
        try {
            const addComment = new Mapper().map(request, new Comment());

            // Comment entity ignores postId and userId during mapping.
            addComment.postId = request.postId;
            addComment.userId = request.userId;

            const createdComment = await new LinqRepository(Comment).create(addComment);

            return new GenericResponse(createdComment.id);
        }
        catch (error) {
            return new Rejection(error);
        }
    }

    public Validate(request: AddCommentCommand): void {
        if (!request.comment.trim()) {
            throw Rejection.BadRequest("Comment cannot be empty.");
        }

        if (!(request.postId > 0)) {
            throw Rejection.BadRequest("Invalid post ID.");
        }

        if (!(request.userId > 0)) {
            throw Rejection.BadRequest("Invalid user ID.");
        }
    }
}
