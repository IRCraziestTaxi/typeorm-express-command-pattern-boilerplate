import { CommandResult } from "../types/CommandResult";
import { CommentDto } from "../DTOs/CommentDto";
import { Rejection } from "../helpers/Rejection";
import { LinqRepository } from "typeorm-linq-repository";
import { Comment } from "../entities/Comment";
import { Mapper } from "ts-simple-automapper";
import { GenericResponse } from "../helpers/GenericResponse";

export class CommentQueries {
    public async getCommentById(commentId: number): Promise<CommandResult<CommentDto>> {
        try {
            if (!(commentId > 0)) {
                return Rejection.BadRequest("Invalid comment ID.");
            }

            const comment = await new LinqRepository(Comment).getById(commentId);

            if (!comment) {
                return Rejection.NotFound("comment");
            }

            const commentDto = new Mapper().map(comment, new CommentDto());

            return new GenericResponse(commentDto);
        }
        catch (error) {
            return new Rejection(error);
        }
    }

    public async getCommentsByPostId(postId: number): Promise<CommandResult<CommentDto[]>> {
        try {
            if (!(postId > 0)) {
                return Rejection.BadRequest("Invalid post ID.");
            }

            const comments = await new LinqRepository(Comment)
                .getAll()
                .where(c => c.postId)
                .equal(postId);

            const commentDtos = new Mapper().mapList(comments, CommentDto);

            return new GenericResponse(commentDtos);
        }
        catch (error) {
            return new Rejection(error);
        }
    }

    public async getCommentsByUserId(userId: number): Promise<CommandResult<CommentDto[]>> {
        try {
            if (!(userId > 0)) {
                return Rejection.BadRequest("Invalid user ID.");
            }

            const comments = await new LinqRepository(Comment)
                .getAll()
                .where(c => c.userId)
                .equal(userId);

            const commentDtos = new Mapper().mapList(comments, CommentDto);

            return new GenericResponse(commentDtos);
        }
        catch (error) {
            return new Rejection(error);
        }
    }
}
