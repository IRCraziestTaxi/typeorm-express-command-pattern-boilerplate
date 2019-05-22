import { Mapper } from "ts-simple-automapper";
import { LinqRepository } from "typeorm-linq-repository";
import { PostDto } from "../DTOs/PostDto";
import { Post } from "../entities/Post";
import { GenericResponse } from "../helpers/GenericResponse";
import { Rejection } from "../helpers/Rejection";
import { CommandResult } from "../types/CommandResult";

export class PostQueries {
    public async getPostById(postId: number): Promise<CommandResult<PostDto>> {
        try {
            if (!(postId > 0)) {
                return Rejection.BadRequest("Invalid post ID.");
            }

            const post = await new LinqRepository(Post).getById(postId);

            if (!post) {
                return Rejection.NotFound("post");
            }

            const postDto = new Mapper().map(post, new PostDto());

            return new GenericResponse(postDto);
        }
        catch (error) {
            return new Rejection(error);
        }
    }

    public async getPostsByUserId(userId: number): Promise<CommandResult<PostDto[]>> {
        try {
            if (!(userId > 0)) {
                return Rejection.BadRequest("Invalid user ID.");
            }

            const posts = await new LinqRepository(Post)
                .getAll()
                .where(p => p.userId)
                .equal(userId);

            const postDtos = new Mapper().mapList(posts, PostDto);

            return new GenericResponse(postDtos);
        }
        catch (error) {
            return new Rejection(error);
        }
    }
}
