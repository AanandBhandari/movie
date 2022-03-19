<h1 align="center">
Movie App (MERN)
</h1>
<p align="center">
MongoDB, Expressjs, React, Nodejs
</p>

> Movie App is a fullstack application using MongoDB, Expressjs, React, Nodejs.

## clone or download
```terminal
$ git clone https://github.com/AanandBhandari/movie.git
```

## project structure
```terminal
vercel.json
api/
   package.json
   .env
   ...
frontend/
   package.json
   ...

```

# Usage (run fullstack app on your machine)

## Prerequisites
- [MongoDB](https://gist.github.com/nrollr/9f523ae17ecdbb50311980503409aeb3)
- [Node](https://nodejs.org/en/download/) ^14.0.0
- [npm](https://nodejs.org/en/download/package-manager/)


## Client-side usage
```terminal
$ cd frontend   // go to frontend folder
$ npm i       // npm install packages
$ npm run start // run it locally

// build for frontend app
$ npm run build // this will compile the react code using webpack and generate a folder called build in the root level
$ npm run start // this will tell webpack to serve react code in the dev environemnt using webpack-dev-server
$ npm rum lint // this will lint the react code with eslint
$ npm run format // this will format the react code using prettier package
```

## Server-side usage

```terminal
$ cd api   // go to api folder
$ npm i       // npm install packages
$ npm run start // run it locally
$ npm run build // this will build the server code to es5 js codes and generate a dist file
$ npm run dev // run it locally using nodemon
$ npm run test // run test cases of all apis using mocha
$ npm run test-watch //this will test apis with watch mode
$ npm run format // this will format code using prettier package
```
# Screenshots of this project

User visit public and Home page and see the list of movies
![User visit public and Home page](https://res.cloudinary.com/dttllxiw2/image/upload/v1647571927/lyaohxw1kjhnwq6bo9jm.png)

User can visit the detail page of movie
![User visit the detail page of movie](https://res.cloudinary.com/dttllxiw2/image/upload/v1647572094/uwvx67zxcbhdbzrzoioa.png)

After going to detail page of the movie, user can open director profile in the modal by clicking the director name
![After visiting movie detail page user can open director profile ](https://res.cloudinary.com/dttllxiw2/image/upload/v1647572449/v6bznrqlwo7bh7bxz1y5.png)

## BUGs or comments

[Create new Issues](https://github.com/AanandBhandari/movie/issues) (preferred)

Email Me: aanandbhandari143@gmail.com

