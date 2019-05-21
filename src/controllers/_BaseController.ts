import { Response } from "express";
import { GenericResponse } from "../helpers/GenericResponse";
import { Rejection } from "../helpers/Rejection";
import { ResponseStatus } from "../helpers/ResponseStatus";
import { CommandResult } from "../types/CommandResult";

export abstract class BaseController {
    protected sendResponse<T>(
        result: CommandResult<T>,
        response: Response,
        successStatus: number = 200
    ): Response {
        if (result instanceof Rejection) {
            return response
                .status(result.reason)
                .json(new GenericResponse(
                    null,
                    ResponseStatus.Failure,
                    result.message
                ));
        }
        else {
            return response
                .status(successStatus)
                .json(result);
        }
    }
}
