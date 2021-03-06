import { CommandResultController } from "@responsekit/express";
import { CommandResultMediator } from "@responsekit/tsmediator";
import { Response } from "express";
import { Body, Delete, Get, JsonController, Param, Post, Put, Res } from "routing-controllers";
import { AddCommentCommand } from "../commands/addComment/AddCommentCommand";
import { AddCommentHandler } from "../commands/addComment/AddCommentHandler";
import { DeletePostCommand } from "../commands/deletePost/DeletePostCommand";
import { DeletePostHandler } from "../commands/deletePost/DeletePostHandler";
import { UpdatePostCommad } from "../commands/updatePost/UpdatePostCommand";
import { UpdatePostHandler } from "../commands/updatePost/UpdatePostHandler";
import { CommentQueries } from "../queries/CommentQueries";
import { PostQueries } from "../queries/PostQueries";

@JsonController("/posts")
export class PostController extends CommandResultController {
    @Post("/:postId/comments")
    public async addComment(
        @Body() request: AddCommentCommand,
        @Param("postId") postId: number,
        @Res() response: Response
    ): Promise<Response> {
        request.postId = postId;
        const addResult = await new CommandResultMediator().Send(AddCommentHandler.type, request);

        return this.sendResponse(addResult, response);
    }

    @Delete("/:postId")
    public async deletePost(
        @Param("postId") postId: number,
        @Res() response: Response
    ): Promise<Response> {
        const request = new DeletePostCommand();
        request.postId = postId;
        const deleteResult = await new CommandResultMediator().Send(DeletePostHandler.type, request);

        return this.sendResponse(deleteResult, response);
    }

    @Get("/:postId/comments")
    public async getComments(
        @Param("postId") postId: number,
        @Res() response: Response
    ): Promise<Response> {
        const commentsResult = await new CommentQueries().getCommentsByPostId(postId);

        return this.sendResponse(commentsResult, response);
    }

    @Get("/:postId")
    public async getPost(
        @Param("postId") postId: number,
        @Res() response: Response
    ): Promise<Response> {
        const postResult = await new PostQueries().getPostById(postId);

        return this.sendResponse(postResult, response);
    }

    @Put("/:postId")
    public async updatePost(
        @Body() request: UpdatePostCommad,
        @Param("postId") postId: number,
        @Res() response: Response
    ): Promise<Response> {
        request.postId = postId;
        const updateResult = await new CommandResultMediator().Send(UpdatePostHandler.type, request);

        return this.sendResponse(updateResult, response);
    }
}
