import { useExpressServer } from "routing-controllers";
import { createApp, getAllowSameOriginHandler, routingControllersOptions } from "./src/app";

createApp()
    .then(app => {
        // You would not want to use getAllowSameOriginHandler
        // in a non-local environment, so having different
        // index files for different environments is a good idea.
        app.use("*", [getAllowSameOriginHandler("*")]);
        useExpressServer(app, routingControllersOptions);
        app.listen(process.env.PORT || 5000);
    });
