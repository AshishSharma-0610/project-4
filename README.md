# School Management System API

A comprehensive backend API for managing a school system, built with Node.js, Express, and MongoDB.

## Features

- 🔐 JWT Authentication
- 👥 Student Management
- 👨‍🏫 Teacher Management
- 📚 Class Management
- 📸 Image Upload (Cloudinary)
- 📊 Attendance Tracking
- 📝 Exam Management
- 📋 Report Generation

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- Cloudinary account

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
MONGODB_URI=mongodb+srv://as5891936:DkSgGGgcuugqAMKa@cluster0.thnsc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=4b0c9a2b7a0b0c3d320c7287d6e43bfb57d65aaf7d0d28ed87f8774c466d59f0
PORT=3000
CLOUDINARY_CLOUD_NAME=dtlczmowk
CLOUDINARY_API_KEY=584845478986471
CLOUDINARY_API_SECRET=clGjut2-Fe2haCiHLYtq3B3esuc
```

## Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```
## API Documentation

For detailed API documentation including request/response formats, authentication, and examples, see [API_ENDPOINTS.md](API_ENDPOINTS.md).

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new admin/teacher
- `POST /api/auth/login` - Login user

### Students
- `POST /api/students` - Add new student
- `GET /api/students` - Get all students (with pagination)
- `GET /api/students/:id` - Get student by ID
- `PUT /api/students/:id` - Update student
- `DELETE /api/students/:id` - Delete student

### Teachers
- `POST /api/teachers` - Add new teacher
- `GET /api/teachers` - Get all teachers (with pagination)
- `GET /api/teachers/:id` - Get teacher by ID
- `PUT /api/teachers/:id` - Update teacher
- `DELETE /api/teachers/:id` - Delete teacher

### Classes
- `POST /api/classes` - Create new class
- `GET /api/classes` - Get all classes (with pagination)
- `GET /api/classes/:id` - Get class by ID
- `PUT /api/classes/:id` - Update class
- `DELETE /api/classes/:id` - Delete class

### Attendance
- `POST /api/attendance` - Mark attendance
- `GET /api/attendance` - Get attendance records

### Exams
- `POST /api/exams` - Create new exam
- `POST /api/exams/results` - Add exam results
- `GET /api/exams/:examId/results` - Get exam results

### Reports
- `GET /api/reports/class/:classId` - Generate class report

## Authentication

The API uses JWT for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your_token>
```

## File Upload

Profile image upload is handled through Cloudinary. Supported formats:
- JPEG
- PNG
- GIF

Maximum file size: 5MB

## Error Handling

The API provides detailed error messages with appropriate HTTP status codes:

- 400: Bad Request
- 401: Unauthorized
- 404: Not Found
- 500: Server Error

## Security Features

- Password Hashing (bcrypt)
- JWT Authentication
- Security Headers (Helmet)
- CORS Enabled
- Request Body Validation (Joi)

## Logging

Winston logger is configured for:
- Error logging
- API request logging
- System events

## Database Models

### Student
- name (String)
- email (String, unique)
- classId (ObjectId)
- profileImageUrl (String)
- isDeleted (Boolean)
- timestamps

### Teacher
- name (String)
- email (String, unique)
- subject (String)
- profileImageUrl (String)
- isDeleted (Boolean)
- timestamps

### Class
- name (String)
- teacherId (ObjectId)
- studentCount (Number)
- timestamps

### Additional Models
- Attendance
- Exam
- Result
- User (Auth)
