# Event Media Platform

A full-stack Event & Media Management Platform built using React, Node.js, Express, PostgreSQL, JWT Authentication, and Tailwind CSS.

## Features

* User Authentication (Signup/Login)
* JWT Protected Routes
* Create Events
* Search Events
* Upload Media
* Delete Media
* Event Gallery
* Responsive UI with Tailwind CSS

## Tech Stack

### Frontend

* React
* React Router
* Axios
* Tailwind CSS

### Backend

* Node.js
* Express.js
* JWT Authentication
* Multer

### Database

* PostgreSQL

## Installation

### Backend

```bash
cd server
npm install
npm run dev
```

### Frontend

```bash
cd client
npm install
npm run dev
```

## Environment Variables

Create `.env` inside server:

```env
DB_USER=your_user
DB_HOST=localhost
DB_NAME=event_media_db
DB_PASSWORD=your_password
DB_PORT=5432

JWT_SECRET=your_secret
```

## Future Enhancements

* AWS S3 Storage
* AI Image Tagging
* Likes & Comments
* User Roles
* Cloud Deployment
