# Assignment

It is a TypeScript CRUD application built with TypeORM, PostgreSQL, and Express. It follows the Controller-Service-Repository pattern to handle the application logic and data persistence. Jest is used for unit testing.

## Assumptions
1. This is a simple CRUD operation app.
2. You can perform any CRUD operations after registering yourself by hitting the endpoint `/register`. More details on **Usage->How to verify endpoints**.
3. With limited information I made this app with basic possible functionalities.
## Prerequisites

Before running this application, ensure that you have the following dependencies installed:

- Node.js>=16.0.0
- npm (Node Package Manager)
- PostgreSQL

## Installation

1. Clone the repository:
```shell
git clone https://github.com/your-username/project-name.git 
```

2. Install the dependencies:
```shell
cd project-name
npm install
```

3. Create a .env file in the parent directory and fill the values for the environment variables accordinge to your database.
```shell
DB_USERNAME = your_db_username
DB_PASSWORD = your_db_password
DB_DATABASE = your_database_name
```

## Usage

1. Start the application. The application will be started and run on  localhost:3002

```shell
npm run start
```


3. Use API endpoints to perform CRUD operations on the resources.

## API Endpoints

The application provides the following API endpoints:

- `POST /register`- Register the user with name, password and email.
- `POST /login` - Login with the user email and password. If user already exists, it will generate a token and send it as a response body.
- `GET /users` - Get all users. Pass email and password in body of request
- `GET /user` - Get a specific user by email and password. Pass email and password in body of request
- `POST /users` - Create a new user. Pass name,email and password in body of request
- `PUT /users` - Update the name of the user. Pass name, email and password of a user in body of request
- `DELETE /users` - Delete a user by email and password. Pass email and password in body of request


## How to verify the Enpoints

### Open POSTMAN to verify the endpoints.
1. After starting the server, first of all **register** the user by passing the *email* and *password* and *name* on body of request.
2. In the response you will get the *token*.
3. Copy the token, go to authorization tab in POSTMAN and choose Bearer->and paste the token here.
4. Now you can hit any endpoint to verify them.
5. Make sure the *token* is required to hit every endpoint except **register** and **login**.

## Testing

The application includes unit tests implemented with Jest. To run the tests, use the following command:
To run the test cases, run the following command
```shell
npm run test
```
### Covered test cases 
1. Should login.
2. Create a new user.
3. Error creating a user if any one field is missing(name,email,password).
4. error creating a user if user already exists.
5. get all the users.
6. get the user if it exists by Email and Password.
7. error getting the user. User does not exist, Email or password is incorrect.
8. update name of the user if it exists based on Email and Password.
9. error updating the user if it does not exists based on Email and Password.
10. delete the user if it exists based on Email and Password.
11. error deleting the user if it does not exist based on Email and Password.

## Folder Structure

The project has the following folder structure:

- `src/` - Contains the source code files.
  - `controllers/` - Implements the API route handlers and delegates the logic to services.
  - `entity/` - Defines the database entity models using TypeORM decorators.
  - `middleware/` - Contains custom middleware functions.
  - `repository/` - Handles database operations and communicates with the entities.
  - `service/` - Implements the business logic and interacts with repositories.
  - `lib/app.ts` - Creates the Express app, registers routes.Creates and destroys the connection with database.
  - `routes/` - Handles the routes and middleware.
  - `config.ts` - Stores JWT configuration settings.
  - `index.ts` - Entry point of the application.
- `tests/` - Contains test files for unit testing using Jest.
  - `users/user-service` - Unit tests for controllers.
- `data-source.ts` - Configuration file for Postgres.
- `bootstrap.ts` - Application instance file for testing

## Extra
1. Eslint is used to maintain the code structured in all the files.
2.  
## Author

Rohan Patel
