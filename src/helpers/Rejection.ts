import { RejectionReason } from "./RejectionReason";

export class Rejection {
    private readonly _message: string;
    private readonly _reason: RejectionReason;

    public constructor(
        error: Rejection | Error | string,
        reason: RejectionReason = RejectionReason.InternalServerError
    ) {
        this._message =
            error instanceof Rejection || error instanceof Error
            ? error.message
            : error;
        this._reason = reason;
    }

    public get message(): string {
        return this._message;
    }

    public get reason(): RejectionReason {
        return this._reason;
    }

    public static BadRequest(message: string = null): Rejection {
        return new Rejection(message || "Invalid request.", RejectionReason.BadRequest);
    }

    public static Forbidden(message: string = null): Rejection {
        return new Rejection(message || "Forbidden.", RejectionReason.Forbidden);
    }

    public static NotFound(entityName: string): Rejection {
        return new Rejection(`Could not find ${entityName}.`, RejectionReason.NotFound);
    }

    public static Unauthorized(message: string = null): Rejection {
        return new Rejection(message || "Unauthorized.", RejectionReason.Unauthorized);
    }
}
