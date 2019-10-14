import { CommandResult, GenericResponse, Rejection } from "@responsekit/core";
import { Mapper } from "ts-simple-automapper";
import { LinqRepository } from "typeorm-linq-repository";
import { UserDto } from "../DTOs/UserDto";
import { User } from "../entities/User";

export class UserQueries {
    public async getUserById(userId: number): Promise<CommandResult<UserDto>> {
        try {
            if (!(userId > 0)) {
                return Rejection.BadRequest("Invalid user ID.");
            }

            const user = await new LinqRepository(User).getById(userId);

            const userDto = new Mapper().map(user, new UserDto());

            return new GenericResponse({
                value: userDto
            });
        }
        catch (error) {
            return new Rejection(error);
        }
    }
}
