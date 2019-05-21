import { Mapper } from "ts-simple-automapper";
import { LinqRepository } from "typeorm-linq-repository";
import { UserDto } from "../DTOs/UserDto";
import { User } from "../entities/User";
import { GenericResponse } from "../helpers/GenericResponse";
import { Rejection } from "../helpers/Rejection";
import { CommandResult } from "../types/CommandResult";

export class UserQueries {
    public async getUserById(userId: number): Promise<CommandResult<UserDto>> {
        try {
            if (!(userId > 0)) {
                return Rejection.BadRequest("Invalid user ID.");
            }

            const user = await new LinqRepository(User).getById(userId);

            const userDto = new Mapper().map(user, new UserDto());

            return new GenericResponse(userDto);
        }
        catch (error) {
            return new Rejection(error);
        }
    }
}
