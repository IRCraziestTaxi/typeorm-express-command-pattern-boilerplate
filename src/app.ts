import * as express from "express";
// tslint:disable-next-line: no-duplicate-imports
import { Application, NextFunction, Request, Response } from "express";
import { RequestHandler } from "express-serve-static-core";
import { RoutingControllersOptions, useExpressServer } from "routing-controllers";
import { ConnectionOptions, createConnection } from "typeorm";
import * as dbConfig from "../ormconfig.json";

const dbOptions = dbConfig[0] as ConnectionOptions;

createConnection(dbOptions)
    .catch((error: any) => {
        console.error(error);
    });

// Set up path to controllers.
const options: RoutingControllersOptions = {
    controllers: [
        `${__dirname}/controllers/*.js`
    ]
};

// Used while testing locally to allow localhost front end and localhost backend to communicate.
// Remove when deploying the API to the server.
const allowSameOrigin: RequestHandler = (request: Request, response: Response, next: NextFunction) => {
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");

    const allowedHeaders: string[] = [
        "Content-Type",
        "Authorization",
        "Content-Length",
        "X-Requested-By",
        "X-Requested-With"// ,
        // AuthTokens.HEADER_AUTH_KEY
    ];
    response.setHeader("Access-Control-Allow-Headers", allowedHeaders.join(","));

    next();
};

const app: Application = express();
app.use("*", [allowSameOrigin]);
useExpressServer(app, options);
app.listen(5000);
