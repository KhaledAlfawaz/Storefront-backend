# Storefront Backend Project

- This project is part of udacity fullstack javascript ND

# Project setup

- run `npm install` to intsall node packages
- run `db-migrate up` to setup and connect to the database
- backend port:`3000`
- database port:`5432`

# scripts

- run `npm run watch` to start the project
- run `npm run test` to start the tests
- run `npm run build` to build the project

# instructions to setup the database and connect to it

- connect to postgres database as the server root user `psql -U postgres`
- run this command to create a new user
  - `CREATE USER full_stack_user WITH PASSWORD 'password123';`
- run this command to create dev and test database
  - `CREATE DATABASE storefront;`
  - `CREATE DATABASE storefront_test;`
- connect to the database and grant privileges
  - `\c storefornt`
  - `GRANT ALL PRIVILEGES ON DATABASE storefront TO full_stack_user;`
  - `\c storefornt_test`
  - `GRANT ALL PRIVILEGES ON DATABASE storefront_test TO full_stack_user;`

## expamle of environment variables

- DB_HOST=localhost
- DB_NAME=storefront_backend
- DB_TEST_NAME=storefront_backend_test
- DB_USER=postgres
- DB_PASSWORD=mypassword
- ENV=dev
- PEPPER=MY_PEPPER
- TOKEN_SECRET=mysecretoken
