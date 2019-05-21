import { ResponseStatus } from "./ResponseStatus";

export class GenericResponse<T> {
    public count: number;
    public message: string;
    public status: ResponseStatus;
    public value: T;

    public constructor(
        value: T,
        status: ResponseStatus = ResponseStatus.Success,
        message: string = null,
        count: number = 0
    ) {
        this.count = count;
        this.message = message;
        this.status = status;
        this.value = value;
    }
}
