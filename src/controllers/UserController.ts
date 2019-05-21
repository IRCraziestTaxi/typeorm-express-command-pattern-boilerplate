import { Response } from "express";
import { Body, Delete, Get, JsonController, Param, Post, Put, Res } from "routing-controllers";
import { AddUserCommand } from "../commands/addUser/AddUserCommand";
import { AddUserHandler } from "../commands/addUser/AddUserHandler";
import { DeleteUserCommand } from "../commands/deleteUser/DeleteUserCommand";
import { DeleteUserHandler } from "../commands/deleteUser/DeleteUserHandler";
import { UpdateUserCommand } from "../commands/updateUser/UpdateUserCommand";
import { UpdateUserHandler } from "../commands/updateUser/UpdateUserHandler";
import { RejectionMediator } from "../helpers/RejectionMediator";
import { UserQueries } from "../queries/UserQueries";
import { BaseController } from "./_BaseController";

@JsonController("/users")
export class UserController extends BaseController {
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
        @Body() request: DeleteUserCommand,
        @Param("userId") userId: number,
        @Res() response: Response
    ): Promise<Response> {
        request.userId = userId;
        const deleteResult = await new RejectionMediator().Send(DeleteUserHandler.type, request);

        return this.sendResponse(deleteResult, response);
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
