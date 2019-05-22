import { Mapper } from "ts-simple-automapper";
import { nameof } from "ts-simple-nameof";
import { Handler, ICommandHandler } from "tsmediator";
import { LinqRepository } from "typeorm-linq-repository";
import { Post } from "../../entities/Post";
import { GenericResponse } from "../../helpers/GenericResponse";
import { Rejection } from "../../helpers/Rejection";
import { CommandResult } from "../../types/CommandResult";
import { AddPostCommand } from "./AddPostCommand";

@Handler(AddPostHandler.type)
export class AddPostHandler implements ICommandHandler<AddPostCommand, Promise<CommandResult<number>>> {
    public static get type(): string {
        return nameof(AddPostHandler);
    }

    public async Handle(request: AddPostCommand): Promise<CommandResult<number>> {
        try {
            const addPost = new Mapper().map(request, new Post());

            // Post entity ignores userId during mapping.
            addPost.userId = request.userId;

            const createdPost = await new LinqRepository(Post).create(addPost);

            return new GenericResponse(createdPost.id);
        }
        catch (error) {
            return new Rejection(error);
        }
    }

    public Validate(request: AddPostCommand): void {
        if (!request.content.trim()) {
            throw Rejection.BadRequest("Post cannot be empty.");
        }

        if (!request.title.trim()) {
            throw Rejection.BadRequest("Title is required.");
        }

        if (!(request.userId > 0)) {
            throw Rejection.BadRequest("Invalid user ID.");
        }
    }
}
