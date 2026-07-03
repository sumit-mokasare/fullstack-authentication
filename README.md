# Fullstack Authentication

A full-stack authentication system built with **React**, **Node.js**, **Express**, and **MongoDB**.

I originally built the backend authentication system during my cohort. After completing the cohort, I continued working on the project independently, and I am currently building the frontend to complete the full authentication flow.

## Features

### Backend Features

* User registration and login
* JWT-based authentication
* Protected routes
* Password hashing with bcrypt
* Authentication middleware
* Secure API structure
* Google OAuth login
  
### Frontend Features

* User signup and login UI
* Form handling and validation
* Protected frontend routes
* Authentication state handling
* Integration with backend authentication APIs

## Tech Stack

### Frontend

* React
* React Router
* Axios
* Tailwind CSS

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcrypt

## Project Status

This project is currently in progress.

The backend authentication system is completed, and I am now working on the frontend part to turn it into a complete full-stack authentication application.

## Purpose of the Project

The goal of this project is to understand how authentication works in a full-stack application, including:

* Backend authentication flow
* Token-based login system
* Protected routes
* Connecting frontend with backend APIs
* Managing user sessions securely

## Folder Structure

```bash
authentication/
│
├── backend/     # Authentication API, database, JWT, middleware, oAuth logic
└── frontend/    # React app for login/signup UI and protected pages
```

## Installation

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd fullstack-authentication
```

### 2. Setup backend

```bash
cd backend
npm install
npm run dev
```

### 3. Setup frontend

```bash
cd frontend
npm install
npm run dev
```

## Environment Variables

Create a `.env` file inside the `backend` folder and see the `.env.sample` and add the variable value there


## Author

Built by **Sumit** as a learning project to practice full-stack authentication, backend development, and frontend-backend integration.
