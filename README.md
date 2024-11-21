# Todo List API
___

# Description
This project is a RESTful API for managing tasks (Todo List), built with the NestJS framework and designed to be easily deployed in a Docker environment. The API supports authentication and CRUD operations for users and tasks, ensuring data persistence using a PostgreSQL database.

---

# Architecture
Project Structure
- Modules: The core components are organized into modules:
  - AuthModule: Manages authentication and JWT token generation.
  - UsersModule: Handles CRUD operations for users.
  - TasksModule: Handles CRUD operations for tasks.

- Entities:
  - User: Represents application users, including email, password, and creation date. 
  - Task: Represents user tasks, including description, creation date, and due date.
  
- Services:
  -   Contains business logic to manipulate entities and perform specific operations.

- Controllers:
    - Expose RESTful endpoints for interacting with services.

---

# Communication Flow

1. Authentication:

- Users log in with their email and password.
- A JWT token is generated and returned.
- All protected routes require the token in the Authorization header.

2. Database:

- Communication with PostgreSQL is managed via MikroORM.
- Migrations are automatically handled by MikroORM.

3. Docker:

- The application runs inside Docker containers, with separate containers for the API and PostgreSQL database.
- All services are connected through a Docker Compose network.

--- 

# Endpoints

### Authentication

- POST `/auth/login`:
  - Description: Authenticates the user and returns a JWT token.
  - Request Body:
    ```
    {
      "email": "example@example.com",
      "password": "password123"
    }
    ```

### Users

- POST `/users`:
  - Description: Creates a new user.
  - Request Body:
  ```
    {
      "email": "example@example.com",
      "password": "password123"
    }
  ```

- GET `/users/:id`:
  - Description: Retrieves user details by ID.

- PATCH `/users/:id`:
  - Description: Updates user information.


- DELETE `/users/:id`:
  - Description: Deletes a user.



### Tasks

- POST `/tasks`:
  - Description: Creates a new task (for the authenticated user).
  - Request Body:
  ```
  {
      "description": "Finish the project",
      "dueDate": "2024-11-30T23:59:59Z"
  }
  ```

- GET `/tasks`:
  - Description: Retrieves all tasks for the authenticated user.
  
- GET `/tasks/:id`:
  - Description: Retrieves details of a specific task.

- PATCH `/tasks/:id`:
  - Description: Updates task information.

- DELETE `/tasks/:id`:
  - Description: Deletes a task.

----

# Database Configuration
- **Database**: PostgreSQL.
- **ORM**: MikroORM.
- Connection:
  - Host: `localhost` (or postgres in Docker Compose).
  - Port: `5432`.
  - Database: `todolist`.
  - User: `postgres`.
  - Password: `postgres`.

---

# Setup Instructions

Assure that you have docker installed and NodeJS.

### Easy way
```
sh setup.sh
```

### Manual way

### Run Locally (not recommended)

You need the Postgres installed locally

1. Install dependencies:

```
yarn install
```

2. Apply migrations:

```
yarn mikro-orm migration:up
```

3. Start the server:

```
yarn start:dev
```

4. Access the API at: http://localhost:3000.

---

## Run with Docker

1. Build and start the containers:

```
docker-compose up --build
```
2. The API will be available at: http://localhost:3000.

---

# Technologies Used
- Framework: NestJS.
- ORM: MikroORM.
- Authentication: JWT.
- Database: PostgreSQL.
- Dependency Management: Yarn.
