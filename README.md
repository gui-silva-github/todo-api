# Todo API

This project is a simple Todo API built using **TypeScript** and transcompiled to **JavaScript**, designed to allow users to add, view, update, and delete tasks. The project is structured with the **MVC software architecture** and uses **middlewares** for authentication with four different strategies: **local**, **private**, **bearer**, and **JWT** (which expires in 30 days).

<hr>

## Recursos

- Add tasks to a local PostgreSQL database.
- View all tasks.
- Update specific tasks.
- Delete tasks using a JWT token.

<hr>

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

<hr>

## Estratégias de Autenticação

- Private Strategy: Restrict access to specific routes.
- Local Strategy: Authenticate with email and password.
- Bearer Strategy: Use a bearer token (todoToken) for access.
- JWT Strategy: Authenticate delete requests using JWT (expires in 30 days).

<hr>

## Variáveis de Ambiente

You need to create a .env file in the root of your project with the following configuration to set up the database connection and JWT key:

- PORT=4000
- PG_DB=todo
- PG_USER=postgres
- PG_PASSWORD=senhaDB
- PG_PORT=5432
- JWT_KEY="123456"

<hr>

### Make sure to add your PostgreSQL credentials and keep the JWT key secure.

## Como rodar

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/gui-silva-github/todo-api.git
   cd todo-api

2. **Instale as dependências:**
   ```bash
   npm install

3. **Crie um arquivo .env e configure as variáveis de ambiente**

4. **Rode o projeto com:**
   ```bash
   npm start

<hr>

## Tecnologias

![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)
![Insomnia](https://img.shields.io/badge/Insomnia-black?style=for-the-badge&logo=insomnia&logoColor=5849BE)
![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)
![Nodemon](https://img.shields.io/badge/NODEMON-%23323330.svg?style=for-the-badge&logo=nodemon&logoColor=%BBDEAD)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)

Passport.js (for authentication strategies) and JWT (JSON Web Tokens)
