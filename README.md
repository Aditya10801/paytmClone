# Paytm Clone

A demo MERN-style payment app inspired by Paytm. This repository includes a React + Vite frontend and an Express + MongoDB backend.

## Features

- User signup and signin with JWT authentication
- Dashboard showing authenticated user profile, account balance, and registered users
- Peer-to-peer money transfer between accounts
- Input validation using Zod on the backend
- Protected API routes for profile, balance, update, and transfer operations

## Project Structure

- `backend/` - Express server, MongoDB models, auth middleware, and REST API routes
- `frontend/` - React app built with Vite, Tailwind-style CSS, and React Router
- `Dockerfile` - MongoDB container initialization for replica set setup

## Tech Stack

- Frontend: React, Vite, React Router
- Backend: Express, Mongoose, JSON Web Tokens, Zod
- Database: MongoDB
- HTTP client: Axios

## Prerequisites

- Node.js 18+ installed
- npm installed
- MongoDB running locally or accessible via connection string

## Setup

### Backend

1. Open a terminal in `backend/`
2. Install dependencies:
   ```bash
   cd backend
   npm install
   ```
3. Create a `.env` file in `backend/` with:
   ```env
   DB=mongodb://localhost:27017/paytmClone
   JWT_SECRET=paytm-aditya
   PORT=3000
   ```
4. Start the backend:
   ```bash
   npm start
   ```

### Frontend

1. Open a terminal in `frontend/`
2. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```
3. Create a `.env` file in `frontend/` with:
   ```env
   VITE_API_BASE=http://localhost:3000/api/v1
   ```
4. Start the frontend:
   ```bash
   npm run dev
   ```

## Development Flow

1. Register a new user via `/signup`
2. Sign in via `/signin`
3. Visit `/dashboard` to view balance and contacts
4. Use `/send` to transfer money to another user account

## API Endpoints

- `POST /api/v1/user/signup` - create a new user and account
- `POST /api/v1/user/signin` - authenticate and return JWT
- `PUT /api/v1/user/update` - update profile (authenticated)
- `GET /api/v1/user/profile` - get logged-in user profile
- `GET /api/v1/user/bulk` - list users optionally filtered by name
- `GET /api/v1/account/balance` - get logged-in account balance
- `POST /api/v1/account/transfer` - transfer funds to another user

## Notes

- The backend uses a simple JWT middleware in `backend/middleware.js`
- Account transfers use a MongoDB session to ensure atomicity
- User passwords are stored in plain text as a demo; do not use this in production




## License

This project is provided for demonstration purposes.
