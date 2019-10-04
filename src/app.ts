import * as express from "express";
// tslint:disable-next-line: no-duplicate-imports
import { Application, NextFunction, Request, Response } from "express";
import { RequestHandler } from "express-serve-static-core";
import { RoutingControllersOptions } from "routing-controllers";
import { createConnection, getConnectionManager, getConnectionOptions } from "typeorm";
import { initializeTransactionalContext, patchTypeORMRepositoryWithBaseRepository } from "typeorm-transactional-cls-hooked";

initializeTransactionalContext();
patchTypeORMRepositoryWithBaseRepository();

const createApp = async () => {
    try {
        await createAppConnection();

        const app: Application = express();

        // Modify app as needed.

        return app;
    }
    catch (error) {
        console.error("Could not create app. An error occured.");
        console.error(error);

        throw error;
    }
};

// This can be useful for applications other than an express app
// (for instance, a lambda handler for an S3 event)
// so that the connection can be closed upon completion.
const createAppConnection = async () => {
    try {
        const connectionManager = getConnectionManager();

        if (!connectionManager.connections.length) {
            const connectionOptions = await getConnectionOptions();

            const envPassword = process.env.TYPEORM_PASSWORD;

            if (envPassword) {
                (connectionOptions as any).password = envPassword;
            }

            return await createConnection(connectionOptions);
        }
    }
    catch (error) {
        console.error("Could not create connection. An error occured.");
        console.error(error);

        throw error;
    }
};

const getAllowSameOriginHandler: (origin: string) => RequestHandler = (origin: string) => {
    return (request: Request, response: Response, next: NextFunction) => {
        response.setHeader("Access-Control-Allow-Origin", origin);
        response.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");

        const allowedHeaders: string[] = [
            "Content-Type",
            "Authorization",
            "Content-Length",
            "X-Requested-By",
            "X-Requested-With"
        ];
        response.setHeader("Access-Control-Allow-Headers", allowedHeaders.join(","));

        next();
    };
};

// Set up path to controllers.
const routingControllersOptions: RoutingControllersOptions = {
    controllers: [
        `${__dirname}/controllers/*.js`
    ]
};

export { createApp, createAppConnection, getAllowSameOriginHandler, routingControllersOptions };
