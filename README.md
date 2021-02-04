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



## Deployment

- Heroku for the backend
  - Endpoint


- Vercel for the frontend
  - Url


# How to Reproduce

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


# Roadmap

- Implementing token refresh features
- Better error handling
