# Serverless Todo App

A full-stack serverless todo application built with React and AWS.

## Tech Stack

Frontend:
- React

Backend:
- AWS Lambda
- API Gateway
- DynamoDB
- Serverless Framework

## Features

- Add tasks
- View tasks
- Serverless backend API
- React frontend interface

## Architecture

React Frontend
   ↓
API Gateway
   ↓
Lambda Functions
   ↓
DynamoDB

## Running the Project

Clone the repository:

git clone https://github.com/Codywiredup/serverless-todo-app

Navigate into the project folder:

cd serverless-todo-app

Install dependencies:

npm install

Start the React app:

npm start

The app will run at:

http://localhost:3000

## API Endpoint

The frontend communicates with this API:

https://zo6qf7vpl5.execute-api.us-east-1.amazonaws.com/dev/tasks
