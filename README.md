# XDC Twitter Trending Hashtags Microservice

### Usage

This microservice handle API requests to fetch trendingHashtags from db:

- trendingHashtags from db

### Steps for local setup

- clone the repository in your local system
- run `npm install` : To install the dependencies
- run `npm run nodemon` : It will start your server on your local machine
- Configuration : `config/env` directory contains files to define environment specific variables
- Dependencies : Defined under `package.json`
- Database configuration : Defined under `config/dbConnection`
- Deployment instructions : Docker based deployment, Dockerfile is there in parent directory

### About env folder

This folder is having different types of variables like DB url, PORT, microservice url etc.

- **development** : Variables which are used in development environment.
- **local** : Variables which are used for local system.
- **production** : Variables which are used for production environment.
- **test** : Variables which are used for testing purpose.
