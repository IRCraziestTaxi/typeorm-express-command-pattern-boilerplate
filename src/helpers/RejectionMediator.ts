import { BaseMediator } from "tsmediator";
import { CommandResult } from "../types/CommandResult";

// From "Overriding mediator behaviour" section of tsmediator readme:
export class RejectionMediator extends BaseMediator {
    public Request<T>(query: string, payload: any): CommandResult<T> {
        return this.Process(query, payload);
    }

    public Send<T>(command: string, payload: any): CommandResult<T> {
        return this.Process(command, payload);
    }

    private Process<T>(msg: string, payload: any): CommandResult<T> {
        const handler: any = super.Resolve(msg);

        try {
            handler.Validate(payload);
        }
        // Since Validate only handles validating the request payload,
        // we have our Validate methods throw a Rejection of type BadRequest.
        catch (rejection) {
            // Validate method threw a Rejection;
            // return it so the controller can handle it gracefully.
            return rejection;
        }

        handler.Log();

        return handler.Handle(payload);
    }
}
