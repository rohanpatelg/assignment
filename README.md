# Project Name

Project Name is a TypeScript CRUD application built with TypeORM, PostgreSQL, and Express. It follows the Controller-Service-Repository pattern to handle the application logic and data persistence. Jest is used for unit testing.

## Prerequisites

Before running this application, ensure that you have the following dependencies installed:

- Node.js
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

## Usage

1. Start the application:

```shell
npm run start
```


3. Use API endpoints to perform CRUD operations on the resources.

## API Endpoints

The application provides the following API endpoints:

- `GET /users` - Get all users. Pass email and password in body of request
- `GET /user` - Get a specific user by email and password. Pass email and password in body of request
- `POST /users` - Create a new user. Pass name,email and password in body of request
- `PUT /users` - Update the name of the user. Pass name, email and password of a user in body of request
- `DELETE /users` - Delete a user by email and password. Pass email and password in body of request

## Testing

The application includes unit tests implemented with Jest. To run the tests, use the following command:


## Folder Structure

The project has the following folder structure:

- `src/` - Contains the source code files.
  - `controllers/` - Implements the API route handlers and delegates the logic to services.
  - `entity/` - Defines the database entity models using TypeORM decorators.
  - `middleware/` - Contains custom middleware functions.
  - `repository/` - Handles database operations and communicates with the entities.
  - `service/` - Implements the business logic and interacts with repositories.
  - `lib/app.ts` - Creates the Express app, registers routes.Creates the connection with database.
  - `routes/` - Handles the routes and middleware.
  - `config.ts` - Stores JWT configuration settings.
  - `index.ts` - Entry point of the application.
- `tests/` - Contains test files for unit testing using Jest.
  - `users/user-service` - Unit tests for controllers.
- `data-source.ts` - Configuration file for Postgres.

## Author

Rohan Patel
