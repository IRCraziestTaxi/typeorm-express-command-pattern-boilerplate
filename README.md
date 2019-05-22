# typeorm-express-command-pattern-boilerplate
Boilerplate example of simple Express API using TypeORM and command pattern.

## Assumptions (or lack thereof)
You will notice this sample API makes no assumptions with regards to authentication or authorization and thus does not demonstrate those important aspects of an API. I did not want to muddy up this example with specific means of authentication and authorization and also did not want to steer developers making use of it in a specific direction, but rather leave it to the developer to explore and implement their own means of security.

With regards to authorization - in particular, ensuring the user accessing an endpoint has rights to do so - the `routing-controllers` library used by this example makes it extremely easy to implement middleware that can be used to perform authorization on an entire controller or on a specific endpoint.

You will notice that endoints involving an add, update, or delete command set the entity ID on the command before sending it to the mediator. This is important when performed in conjunction with authorization on those endpoints to ensure that the user is acting on the entity they have been authorized to act on. Otherwise, the user could send a request with a different ID than the ID in the API route and could thus act on entities they may not be authorized to act on.