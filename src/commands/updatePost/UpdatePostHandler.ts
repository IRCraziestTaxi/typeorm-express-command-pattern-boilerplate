import { CommandResult, GenericResponse, Rejection } from "@responsekit/core";
import { Mapper } from "ts-simple-automapper";
import { nameof } from "ts-simple-nameof";
import { Handler, ICommandHandler } from "tsmediator";
import { LinqRepository } from "typeorm-linq-repository";
import { Post } from "../../entities/Post";
import { UpdatePostCommad } from "./UpdatePostCommand";

@Handler(UpdatePostHandler.type)
export class UpdatePostHandler implements ICommandHandler<UpdatePostCommad, Promise<CommandResult<boolean>>> {
    public static get type(): string {
        return nameof(UpdatePostHandler);
    }

    public async Handle(request: UpdatePostCommad): Promise<CommandResult<boolean>> {
        try {
            const postRepository = new LinqRepository(Post);

            const post = await postRepository.getById(request.postId);

            if (!post) {
                return Rejection.NotFound("post");
            }

            new Mapper().map(request, post);

            await postRepository.update(post);

            return new GenericResponse({
                value: true
            });
        }
        catch (error) {
            return new Rejection(error);
        }
    }

    public Validate(request: UpdatePostCommad): void {
        if (!request.content.trim()) {
            throw Rejection.BadRequest("Post cannot be empty.");
        }

        if (!(request.postId > 0)) {
            throw Rejection.BadRequest("Invalid post ID.");
        }

        if (!request.title.trim()) {
            throw Rejection.BadRequest("Title is required.");
        }
    }
}
