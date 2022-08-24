## Trot race simulator project

This repository contains the code for the trot race simulator project.

## Environment Variables

The environment variable file is already in the repository. I understand that such files shouldn't be pushed into github but I've put it here just for the sake of this demo.

## Run Locally

Go to the project directory

```
  cd race-simulator
```

#### Install dependencies

Install yarn

```
  npm install yarn
```

```
  yarn
```

#### Start the server

```
  yarn start
```

### Mongo DB

URI for local MongoDB:

> mongodb://localhost:27017/TrotRace

The above is already mentioned in the .env file.

## Docker

Change the **MONGO_DB_URL** value from "localhost" to "mongo" in .env file.

Use below command to run the project on docker:

```
  docker-compose up
```

## Running Tests

To run tests, run the below command:

```
  yarn test
```

Get the report for the code coverage:

```
    yarn run test:coverage
```

## Check eslint warnings and errors

Use below command to check lint issues:

```
    yarn run lint:check
```

To fix lint issue, use following command:

```
    yarn run lint:fix
```

If you make any changes, please be sure to check for code formatting.

### Code formatting

Check for code formatting

```
    yarn run format:check
```

Format code:

```
    yarn run format:write
```
