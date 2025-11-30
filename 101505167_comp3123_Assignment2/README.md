# Employee Management System  
COMP3123 – Full Stack Assignment 2  
Student: Cherish Nwansi  
Student ID: 101505167  

## Overview
This project is a full-stack Employee Management System built with:
- **React** (frontend)
- **Node.js & Express** (backend)
- **MongoDB** (database)
- **Docker + Docker Compose** (containerization)

The application supports:
- User Signup & Login  
- View Employee List  
- Add Employee  
- Edit Employee  
- Delete Employee  

A clean UI with a pink theme, navbar, and navigation flow is implemented for usability.

---

## Tech Stack
**Frontend:** React, Axios, Bootstrap  
**Backend:** Node.js, Express.js, Mongoose  
**Database:** MongoDB  
**Tools:** Docker, Docker Compose, VS Code  

---

## Running the Application (Docker)
Make sure Docker Desktop is running, then in the project root run:
-- docker-compose up --build --

## Services:
- Frontend → http://localhost:3001  
- Backend → http://localhost:5000  
- MongoDB → mongodb://localhost:27017  
- Mongo Express → http://localhost:8081  

---

## API Endpoints
### User
- POST `/api/v1/user/signup`
- POST `/api/v1/user/login`

### Employees
- GET `/api/v1/emp/employees`
- GET `/api/v1/emp/employees/:id`
- POST `/api/v1/emp/employees`
- PUT `/api/v1/emp/employees/:id`
- DELETE `/api/v1/emp/employees?eid=<id>`

---

## Screenshots (for Submission)
Include the following in your submission ZIP:
- Login Page  
- Employee List Page  
- Add Employee Page  
- Edit Employee Page  
- MongoDB Data  
- Docker Containers Running  

---

## How to Use
1. Create an account using Signup  
2. Login → redirected to Employee List  
3. Use **Add**, **Edit**, and **Delete** to manage employees  
4. Logout returns to the login page  

---

## Notes
- Project meets all COMP3123 Assignment 2 requirements  
- Fully containerized and ready for submission  

---