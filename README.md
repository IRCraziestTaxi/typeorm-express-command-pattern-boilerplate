# typeorm-express-command-pattern-boilerplate
Boilerplate example of simple Express API using TypeORM and command pattern.

## Assumptions (or lack thereof)
You will notice this sample API makes no assumptions with regards to authentication or authorization and thus does not demonstrate those important aspects of an API. I did not want to muddy up this example with specific means of authentication and authorization and also did not want to steer developers making use of it in a specific direction, but rather leave it to the developer to explore and implement their own means of security.

With regards to authorization - in particular, ensuring the user accessing an endpoint has rights to do so - the `routing-controllers` library used by this example makes it extremely easy to implement middleware that can be used to perform authorization on an entire controller or on a specific endpoint.

You will notice that endoints involving an add, update, or delete command set the entity ID on the command before sending it to the mediator. This is important when performed in conjunction with authorization on those endpoints to ensure that the user is acting on the entity they have been authorized to act on. Otherwise, the user could send a request with a different ID than the ID in the API route and could thus act on entities they may not be authorized to act on.

## Compiling the code
To compile the source code while ignoring migration files, which are compiled via a different command (see the Migrations section below), run the command:

* `npm run tsc`: Compiles code to the `build` folder for running the app locally while creating source maps and watching for changes.
* `npm run dist`: Compiles code to the `dist` folder without creating source maps or watching for changes.

## Running the app
To run the app after running the command `npm run tsc` (explained above), run the command `npm start`.

## Linting
To check your code against the awesome TSLint rules defined in `tslint.json`, run the command `npm run tslint`.

## Migrations
Use the following commands (defined in `package.json`) to create, build, apply, and revert migrations.

* `npm run mig:make -- -n <migrationName>` - Call the `mig:make` script and provide the name argument for the migration required by TypeORM. For example, your initial migration may be created by running the command `npm run mig:make -- -n Initial`.
* `npm run mig:build` - Compile generated typescript migration files into the javascript used by the TypeORM CLI to apply the migration.
* `npm run mig:run` - Apply all pending migrations to the database specified in `ormconfig.json`.
* `npm run mig:revert` - Revert the last applied migration. Note that only one migration may be reverted at a time, so to revert several migrations, you will need to run this command multiple times.

## Database configuration
Modify the `ormconfig.json` file as needed for your database configuration. While `mysql` is specified as the `type` in this example's `ormconfig.json`, the `mysql` NPM package is not included in `package.json`, so be sure to install the driver needed for your configuration.

## Database configuration by environment
There are a handful of ways to use different `ormconfig` files for different environments, so I leave that up to you to implement. An approach I have used in the past is to add `ormconfig.json` to `.gitignore` and use `gulp` to copy and rename `ormconfig.*.json`, where `*` is a different environment and the corresponding `gulp` task is specified in a `build:*` NPM script, but there may be better ways depending on your preference.

Also note that in any non-local build, it is wise to provide the `password` property via an environment variable rather than in `ormconfig.json`, so you may want to do that and remove `password` from any non-local `ormconfig.*.json` file. Note that `createAppConnection` facilitates this by checking for `process.env.TYPEORM_PASSWORD`.