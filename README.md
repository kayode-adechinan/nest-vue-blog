# Demo

- 

# Overview

This fullstack app is a simple blog platform providing the following features

  - User authentication with JWT
  - Publishing posts
  - Anonymous comments
  - Subscribing to newsletter
  - Sending emails


# Architecture

## Models

  - User (has many posts)
  - Post (has many comments)
  - Comment
  - Subscriber


# Deployment

- Heroku for the backend
  - Endpoint


- Vercel for the frontend
  - Url

# Roadmap

- Implementing token refresh features
- Better error handling


# Reproduce

## Set your env vars

- rename the .env.example to .env
- get up a mongo db 
- get up a mailjet account
- update env vars with your credentials

## Run locally

- cd into **frontend** folder
- open up the frontend/src/constants.js file
- update your server url
- open up the src/constants.ts file
- update your frontend url

https://docs.nestjs.com/recipes/cqrs


https://itnext.io/cqrs-pattern-nestjs-node-js-cf20fd9bb07


To do

- settup mongo db - done

- settup auth - done

- settup crud for post

- settup cqrs for newlestter

- handle auth on vue side

- handle post crud on vue side

- handle newsletter on vue side

- deploy vue on netlify

- deploy api on heroku

- adding some test on api

- adding some test on frontend

- setup ci/cd

- adding documentation

- done before 17





<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>


let urldb = `mongodb+srv://ade:ade@cluster0.hecjq.mongodb.net/eyeco?retryWrites=true&w=majority`;

mongodb+srv://ade:ade@cluster0.rwagc.mongodb.net/pages?retryWrites=true&w=majority



//web: npm run start:prod
// this enable to start without using ts-node
// this will run prestart:prod automatically

//heroku config:set NPM_CONFIG_PRODUCTION=false
//heroku config:set NODE_ENV=production
// this allow us to build in heroku



//Deploy to Heroku (With source code)
//This allow a slept Heroku App to wake up faster.
//Update .gitIgnore
//# /dist
//Update package.json, add scripts
//“start:dist”: “node dist/main.js”,
//Update/Create Procfile



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