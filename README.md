# express-application-template
A template to use for writing express applications

# How to use
```bash
npx degit lucasew/express-application-template /path/to/destination
yarn 
yarn dev # to start the server and restart when the files change
yarn start # to start the server without auto restart
```

# This template includes:

- Let it burn strategy to handle errors inside the route handlers. You can throw 
a error without the Unhandled Promise Rejection problem.
Credits: [express-promise-router](https://www.npmjs.com/package/express-promise-router)

- Throw errors inside functions called by the route that not
necessarily have acess to the response object without hanging the request.
See throwApiError at [here](./src/utils/index.ts)

- Validation errors caused by celebrate/joi when throwed are returned as error 400 instead of 500

- This system is projected to always return a object that matches the following interface
```typescript
interface ServerResponse<T> {
  data: T
  error: string
}
```

- Sqlite via knex configured and with a [sample CRUD route](./src/routes/api/test/index.ts)

- A example endpoint to show how to throw errors with custom status code. 
See [./src/routes/api/returnStatusCode/index.ts](./src/routes/api/returnStatusCode/index.ts)

- Preconfigured celebrate/joi setup with [examples](./src/routes/api/test/index.ts)

- 100% implemented in typescript

- A generic plugin loader and a function to use this generic plugin loader to load new routes, that is also used to load
the routes of this project. Just create a folder and start writing your index.ts exporting the router.
See: [src/utils/index.ts](./src/utils/index.ts)

- Data folder separated from code. You can also change the data folder using environment variables. 
See: [src/config.ts](./src/config.ts)


