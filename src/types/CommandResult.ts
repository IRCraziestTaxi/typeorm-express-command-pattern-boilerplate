import { GenericResponse } from "../helpers/GenericResponse";
import { Rejection } from "../helpers/Rejection";

export type CommandResult<T> = GenericResponse<T> | Rejection;
