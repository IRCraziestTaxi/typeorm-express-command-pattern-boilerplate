import { Response } from "express";
import { Body, Delete, Get, JsonController, Param, Post, Put, Res } from "routing-controllers";
import { AddPostCommand } from "../commands/addPost/AddPostCommand";
import { AddPostHandler } from "../commands/addPost/AddPostHandler";
import { AddUserCommand } from "../commands/addUser/AddUserCommand";
import { AddUserHandler } from "../commands/addUser/AddUserHandler";
import { DeleteUserCommand } from "../commands/deleteUser/DeleteUserCommand";
import { DeleteUserHandler } from "../commands/deleteUser/DeleteUserHandler";
import { UpdateUserCommand } from "../commands/updateUser/UpdateUserCommand";
import { UpdateUserHandler } from "../commands/updateUser/UpdateUserHandler";
import { RejectionMediator } from "../helpers/RejectionMediator";
import { CommentQueries } from "../queries/CommentQueries";
import { PostQueries } from "../queries/PostQueries";
import { UserQueries } from "../queries/UserQueries";
import { BaseController } from "./_BaseController";

@JsonController("/users")
export class UserController extends BaseController {
    @Post("/:userId/posts")
    public async addPost(
        @Body() request: AddPostCommand,
        @Param("userId") userId: number,
        @Res() response: Response
    ): Promise<Response> {
        request.userId = userId;
        const addResult = await new RejectionMediator().Send(AddPostHandler.type, request);

        return this.sendResponse(addResult, response);
    }

    @Post()
    public async addUser(
        @Body() request: AddUserCommand,
        @Res() response: Response
    ): Promise<Response> {
        const addResult = await new RejectionMediator().Send(AddUserHandler.type, request);

        return this.sendResponse(addResult, response);
    }

    @Delete("/:userId")
    public async deleteUser(
        @Param("userId") userId: number,
        @Res() response: Response
    ): Promise<Response> {
        const request = new DeleteUserCommand();
        request.userId = userId;
        const deleteResult = await new RejectionMediator().Send(DeleteUserHandler.type, request);

        return this.sendResponse(deleteResult, response);
    }

    @Get("/:userId/comments")
    public async getComments(
        @Param("userId") userId: number,
        @Res() response: Response
    ): Promise<Response> {
        const commentsResult = await new CommentQueries().getCommentsByUserId(userId);

        return this.sendResponse(commentsResult, response);
    }

    @Get("/:userId/posts")
    public async getPosts(
        @Param("userId") userId: number,
        @Res() response: Response
    ): Promise<Response> {
        const postsResult = await new PostQueries().getPostsByUserId(userId);

        return this.sendResponse(postsResult, response);
    }

    @Get("/:userId")
    public async getUser(
        @Param("userId") userId: number,
        @Res() response: Response
    ): Promise<Response> {
        const userResult = await new UserQueries().getUserById(userId);

        return this.sendResponse(userResult, response);
    }

    @Put("/:userId")
    public async updateUser(
        @Body() request: UpdateUserCommand,
        @Param("userId") userId: number,
        @Res() response: Response
    ): Promise<Response> {
        request.userId = userId;
        const updateResult = await new RejectionMediator().Send(UpdateUserHandler.type, request);

        return this.sendResponse(updateResult, response);
    }
}
