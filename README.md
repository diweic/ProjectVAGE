## Introduction
Welcome to Project VAGE! This is a web app for anime fans to sell, buy, and trade anime goods such as badges, figures, illustration books, CDs, and more.

## Developer Tools
- `gitpush.sh`: simple script to add, commit, and push to main with a custom message

## Overview
A minimal full‑stack app with an React frontend and an Express backend.

Refer to `.gitignore` to see which files/folders are excluded. This README only describes tracked parts of the project.

## Getting Started
- Install server dependencies: `npm install`
- Install client dependencies: `cd client && npm install`
- Start client (development): `npm start` inside `client/`
- Start server: from project root, run `node server.js` (or add a script in `package.json` if desired)

## Project Structure
- `client/`: React frontend (Create React App)
  - `public/`: Static HTML and assets served by the client
  - `src/`: App source code
    - `index.js`: App entry; mounts React and imports global styles
    - `index.css`: Base styles from CRA
    - `center.css`: Minimal global centering and simple sizing for buttons/inputs
    - `App.js`: Defines routes for pages
    - `Home.jsx`: Landing page and quick navigation
    - `Login.jsx`: Login form and auth flow
    - `Signup.jsx`: Signup form and validation
    - `Profile.jsx`: Protected profile page (requires token)
    - `NewPost.jsx`: Create a new post with image uploads
    - `Posts.jsx`: List of posts with images
    - `reportWebVitals.js`: Performance reporting helper
  - `build/`: Production build output (generated)
- `server.js`: Express server setup and API mounting
- `routes/`: Backend API route handlers
  - `login.js`: Login endpoint
  - `signup.js`: Signup endpoint
  - `profile.js`: User profile endpoint (requires auth)
  - `posts.js`: Posts listing/creation endpoints
  - `upload.js`: Image upload endpoint
- `middleware/`
  - `auth.js`: JWT auth middleware for protected routes
- `db.js`: Database connection/helper
- `package.json`: Root project metadata and scripts
- `client/package.json`: Client app metadata and scripts
- `README.md`: This file
- `gitpush.sh`: Convenience script for committing and pushing

Note: Sensitive or large files/folders that should not be committed are listed in `.gitignore`. See that file for details rather than documenting them here.
