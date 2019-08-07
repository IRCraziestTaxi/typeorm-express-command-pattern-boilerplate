import { Response } from "express";
import { Body, Delete, Get, JsonController, Param, Put, Res } from "routing-controllers";
import { DeleteCommentCommand } from "../commands/deleteComment/DeleteCommentCommand";
import { DeleteCommentHandler } from "../commands/deleteComment/DeleteCommentHandler";
import { UpdateCommentCommand } from "../commands/updateComment/UpdateCommentCommand";
import { UpdateCommentHandler } from "../commands/updateComment/UpdateCommentHandler";
import { RejectionMediator } from "../helpers/RejectionMediator";
import { CommentQueries } from "../queries/CommentQueries";
import { BaseController } from "./_BaseController";

@JsonController("/comments")
export class CommentController extends BaseController {
    @Delete("/:commentId")
    public async deleteComment(
        @Param("commentId") commentId: number,
        @Res() response: Response
    ): Promise<Response> {
        const request = new DeleteCommentCommand();
        request.commentId = commentId;
        const deleteResult = await new RejectionMediator().Send(DeleteCommentHandler.type, request);

        return this.sendResponse(deleteResult, response);
    }

    @Get("/:commentId")
    public async getComment(
        @Param("commentId") commentId: number,
        @Res() response: Response
    ): Promise<Response> {
        const commentResult = await new CommentQueries().getCommentById(commentId);

        return this.sendResponse(commentResult, response);
    }

    @Put("/:commentId")
    public async updateComment(
        @Body() request: UpdateCommentCommand,
        @Param("commentId") commentId: number,
        @Res() response: Response
    ): Promise<Response> {
        request.commentId = commentId;
        const updateResult = await new RejectionMediator().Send(UpdateCommentHandler.type, request);

        return this.sendResponse(updateResult, response);
    }
}
