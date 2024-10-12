# Todo API

This project is a simple Todo API built using **TypeScript** and transcompiled to **JavaScript**, designed to allow users to add, view, update, and delete tasks. The project is structured with the **MVC software architecture** and uses **middlewares** for authentication with four different strategies: **local**, **private**, **bearer**, and **JWT** (which expires in 30 days).

## Recursos

- Add tasks to a local PostgreSQL database.
- View all tasks.
- Update specific tasks.
- Delete tasks using a JWT token.

## Rotas

- **`/todo (GET)`**: View all tasks listed in the database. Requires the header `Authorization: Bearer todoToken` in the request.
  
- **`/todo (POST)`**: Add a task to the database. Requires the header `Authorization: Bearer todoToken` and the following JSON payload in the request:
  
  ```json
  {
    "email": "todo@gmail.com",
    "password": "@todo",
    "title": "Task title"
  }

- **`/todo/:id (PUT)`**: Update a specific task in the database. Requires the header Authorization: Bearer todoToken and the following JSON payload in the request:

    ```json
    {
    "title": "New Task Title",
    "done": "true"
    }

- **`/todo/:id (DELETE)`**: Delete a specific task in the database. Requires the header Authorization: Bearer token-jwt.

Note: The token-jwt can be obtained by making a POST request to the route /todo/jwt, which will return the JWT needed for the delete operation.

## Estratégias de Autenticação

- Private Strategy: Restrict access to specific routes.
- Local Strategy: Authenticate with email and password.
- Bearer Strategy: Use a bearer token (todoToken) for access.
- JWT Strategy: Authenticate delete requests using JWT (expires in 30 days).

## Tecnologias

TypeScript
JavaScript
Node.js
Express.js
PostgreSQL
Passport.js (for authentication strategies)
JWT (JSON Web Tokens)

## Variáveis de Ambiente

You need to create a .env file in the root of your project with the following configuration to set up the database connection and JWT key:

PORT=4000
PG_DB=todo
PG_USER=postgres
PG_PASSWORD=senhaDB
PG_PORT=5432
JWT_KEY="123456"

### Make sure to add your PostgreSQL credentials and keep the JWT key secure.

## Como rodar

1. Clone the repository:

git clone https://github.com/gui-silva-github/todo-api.git

2. Install the dependencies:

npm install

Run the server:

npm start