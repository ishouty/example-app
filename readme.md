# Example App

This is a sample web application application, which displays a list of users when you are authenticated with a valid session.

The project is organized using an Nx mono-repo setup, which allows for efficient management of multiple projects within the same repository.

## Table of Contents

- [Project Summary](#tech-stack)
  - [App UI](#app-ui)
  - [API](#api)
- [Getting Started](#getting-started)

  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the App UI](#running-the-app-ui)
  - [Running the Api](#running-the-app-ui)
  - [Build](#running-the-app-ui)

- [Linting and Code Formatting](#linting-and-code-formatting)
- [Running Tests & Coverage](#running-tests-&-coverage)

## Project Summary

## App UI

This project is a modern web application built with a scalable and modular architecture using Next.js with App Router for page routing and rendering. The state management is powered by Redux Toolkit, ensuring a streamlined and efficient way to manage global state across the application. To handle API requests and server-side data fetching, we use TanStack Query and Axios for robust querying capabilities. Context Providers are implemented for localized state management where required. The application is styled using Tailwind CSS, with classnames to conditionally manage styles within components.

We have adopted the Atomic Design System to structure components in a modular and scalable fashion, ensuring ease of maintenance and reusability.

## Table Contents

#### Tech Stack Summary

- Next.js (App Router): Server-side rendering and routing.
- Redux Toolkit: State management for the entire application.
- TanStack Query: Server-side data fetching and caching.
- Axios: HTTP client for making API requests.
- Tailwind CSS: Utility-first CSS framework for styling.
- Classnames: Helper for conditional class management in components.
- ESLint: Code quality tool to enforce coding standards.
- Prettier: Code formatter to maintain a consistent code style.
- Nx Mono-Repo: Manages the project in a mono-repo structure to share code across apps.
- Atomic Design System: Organizes UI components into atoms, molecules, and organisms for modularity.

## API

This project is a scalable backend API built using NestJS, Prisma as the ORM, SQLite as the database, and JWT for secure authentication. It follows modern practices like using Route Guards for authentication and role-based access control, and the API is documented with Swagger for ease of integration and testing.

Key Technologies:

- NestJS: A progressive Node.js framework for building efficient, scalable, and well-structured server-side applications. It supports a modular architecture and integrates well with other modern technologies.

- Prisma: A next-generation ORM that simplifies database access, providing type-safe database queries and migrations. In this project, Prisma is used for managing the database layer and handling interactions with the SQLite database.

- SQLite: A lightweight, serverless SQL database engine used for storing the application data. It's embedded within the application and is ideal for development and smaller-scale deployments.

- JWT Strategy: JWT (JSON Web Token) is used for securing routes and managing user authentication. Tokens are issued when users log in, and these tokens are used to verify user identity on subsequent requests.

- Route Guard: Guards are used to protect specific routes by ensuring only authenticated users or users with specific roles have access to those routes. This provides security and restricts access to sensitive data.

- Swagger: The API is documented using Swagger, providing an interactive interface for testing and exploring the API endpoints. This ensures that developers or external clients can easily understand how to use the API.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (v20 or above)
- **npm** or **yarn** package manager
- **Git** (optional, for version control)

### Installation

To set up the project locally, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/project-name.git
   ```

2. **Install Dependencies **

```
yarn
```

3. **Copy env**

```
Copy .env.template in each mono repo api and app-ui to .env
```

4. **Prisma Generate & Migrate**

To generate admin user and generate types for application. The database is local within the repo as this is for demonstration purposes.

```
yarn nx run api:prisma-generate
```

```
yarn nx run api:prisma-push
```

Run the API
This will be ran on http//:localhost:3000

You can view the api swagger documentation to understand the API
http//:localhost:3000/swagger

```
yarn nx run:api:serve
```

Run the App UI
This will be ran on http//:localhost:4200

```
yarn run app-ui:dev
```

### Linting and Code Formatting

App UI

```
yarn nx run app-ui:lint
```

API

```
yarn nx run api:lint
```

Prettier

```
npm run prettier --write .
```

### Running Tests & Coverage

Testing is set up to ensure robust code quality and to catch regressions early. We aim for full test coverage for all critical parts of the application.

Jest is used to do unit testing for both the react components and nest API.

Goal is to maintain 100% test coverage across all areas, ensuring that both business logic and edge cases are thoroughly tested.

The generated coverage report for both mono repo apps is generated within the parent repo which you can view the coverage and what the code has tested.

**Run tests for API mono repo**

```
yarn nx run api:test

```

**Run tests for App UI**

```
yarn nx run app-ui:test

```

## Build

You can compile the mono repo of the application. Specify if you want to build development or production for .env.production
App UI. If you do not specify the environment it will take the default .env

```
yarn nx app-ui:build

yarn nx app-ui:build --env=dev


yarn nx app-ui:build --env=production
```

API

```
yarn nx api:build

yarn nx api:build --env=dev

yarn nx api:build --env=production
```
