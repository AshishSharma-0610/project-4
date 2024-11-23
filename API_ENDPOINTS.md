# API Documentation

## Base URL
```
http://localhost:3000/api
```

## Authentication Endpoints

### Register User
```http
POST /auth/register
```

**Request Body:**
```json
{
  "email": "admin@school.com",
  "password": "password123",
  "role": "admin"
}
```

**Response:** `201 Created`
```json
{
  "_id": "user_id",
  "email": "admin@school.com",
  "role": "admin",
  "token": "jwt_token"
}
```

### Login User
```http
POST /auth/login
```

**Request Body:**
```json
{
  "email": "admin@school.com",
  "password": "password123"
}
```

**Response:** `200 OK`
```json
{
  "_id": "user_id",
  "email": "admin@school.com",
  "role": "admin",
  "token": "jwt_token"
}
```

## Student Endpoints

### Add New Student
```http
POST /students
```

**Headers:**
```
Authorization: Bearer jwt_token
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@school.com",
  "classId": "class_id"
}
```

**Response:** `201 Created`
```json
{
  "_id": "student_id",
  "name": "John Doe",
  "email": "john@school.com",
  "classId": "class_id",
  "profileImageUrl": null,
  "isDeleted": false,
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

### Get All Students
```http
GET /students?page=1&limit=10&classId=class_id
```

**Headers:**
```
Authorization: Bearer jwt_token
```

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `classId` (optional): Filter by class ID

**Response:** `200 OK`
```json
{
  "students": [
    {
      "_id": "student_id",
      "name": "John Doe",
      "email": "john@school.com",
      "classId": {
        "_id": "class_id",
        "name": "Grade 10A"
      },
      "profileImageUrl": "image_url",
      "isDeleted": false,
      "createdAt": "timestamp",
      "updatedAt": "timestamp"
    }
  ],
  "page": 1,
  "pages": 5,
  "total": 50
}
```

### Get Student by ID
```http
GET /students/:id
```

**Headers:**
```
Authorization: Bearer jwt_token
```

**Response:** `200 OK`
```json
{
  "_id": "student_id",
  "name": "John Doe",
  "email": "john@school.com",
  "classId": {
    "_id": "class_id",
    "name": "Grade 10A"
  },
  "profileImageUrl": "image_url",
  "isDeleted": false,
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

### Update Student
```http
PUT /students/:id
```

**Headers:**
```
Authorization: Bearer jwt_token
Content-Type: multipart/form-data
```

**Request Body:**
- `name` (optional): Student name
- `email` (optional): Student email
- `classId` (optional): Class ID
- `profileImage` (optional): Image file

**Response:** `200 OK`
```json
{
  "_id": "student_id",
  "name": "John Doe Updated",
  "email": "john@school.com",
  "classId": "class_id",
  "profileImageUrl": "updated_image_url",
  "isDeleted": false,
  "updatedAt": "timestamp"
}
```

### Delete Student
```http
DELETE /students/:id
```

**Headers:**
```
Authorization: Bearer jwt_token
```

**Response:** `200 OK`
```json
{
  "message": "Student removed"
}
```

## Teacher Endpoints

### Add New Teacher
```http
POST /teachers
```

**Headers:**
```
Authorization: Bearer jwt_token
```

**Request Body:**
```json
{
  "name": "Jane Smith",
  "email": "jane@school.com",
  "subject": "Mathematics"
}
```

**Response:** `201 Created`
```json
{
  "_id": "teacher_id",
  "name": "Jane Smith",
  "email": "jane@school.com",
  "subject": "Mathematics",
  "profileImageUrl": null,
  "isDeleted": false,
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

### Get All Teachers
```http
GET /teachers?page=1&limit=10
```

**Headers:**
```
Authorization: Bearer jwt_token
```

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)

**Response:** `200 OK`
```json
{
  "teachers": [
    {
      "_id": "teacher_id",
      "name": "Jane Smith",
      "email": "jane@school.com",
      "subject": "Mathematics",
      "profileImageUrl": "image_url",
      "isDeleted": false,
      "createdAt": "timestamp",
      "updatedAt": "timestamp"
    }
  ],
  "page": 1,
  "pages": 3,
  "total": 30
}
```

## Class Endpoints

### Create New Class
```http
POST /classes
```

**Headers:**
```
Authorization: Bearer jwt_token
```

**Request Body:**
```json
{
  "name": "Grade 10A",
  "teacherId": "teacher_id"
}
```

**Response:** `201 Created`
```json
{
  "_id": "class_id",
  "name": "Grade 10A",
  "teacherId": "teacher_id",
  "studentCount": 0,
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

### Get All Classes
```http
GET /classes?page=1&limit=10
```

**Headers:**
```
Authorization: Bearer jwt_token
```

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)

**Response:** `200 OK`
```json
{
  "classes": [
    {
      "_id": "class_id",
      "name": "Grade 10A",
      "teacherId": {
        "_id": "teacher_id",
        "name": "Jane Smith",
        "email": "jane@school.com",
        "subject": "Mathematics"
      },
      "studentCount": 25,
      "createdAt": "timestamp",
      "updatedAt": "timestamp"
    }
  ],
  "page": 1,
  "pages": 2,
  "total": 15
}
```

## Attendance Endpoints

### Mark Attendance
```http
POST /attendance
```

**Headers:**
```
Authorization: Bearer jwt_token
```

**Request Body:**
```json
{
  "studentId": "student_id",
  "classId": "class_id",
  "date": "2023-11-15",
  "status": "present",
  "note": "Arrived on time"
}
```

**Response:** `201 Created`
```json
{
  "_id": "attendance_id",
  "studentId": "student_id",
  "classId": "class_id",
  "date": "2023-11-15T00:00:00.000Z",
  "status": "present",
  "note": "Arrived on time",
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

### Get Attendance Records
```http
GET /attendance?classId=class_id&date=2023-11-15&studentId=student_id
```

**Headers:**
```
Authorization: Bearer jwt_token
```

**Query Parameters:**
- `classId` (optional): Filter by class
- `date` (optional): Filter by date
- `studentId` (optional): Filter by student

**Response:** `200 OK`
```json
[
  {
    "_id": "attendance_id",
    "studentId": {
      "_id": "student_id",
      "name": "John Doe",
      "email": "john@school.com"
    },
    "classId": {
      "_id": "class_id",
      "name": "Grade 10A"
    },
    "date": "2023-11-15T00:00:00.000Z",
    "status": "present",
    "note": "Arrived on time",
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  }
]
```

## Exam Endpoints

### Create New Exam
```http
POST /exams
```

**Headers:**
```
Authorization: Bearer jwt_token
```

**Request Body:**
```json
{
  "title": "Mathematics Midterm",
  "classId": "class_id",
  "subject": "Mathematics",
  "date": "2023-11-20",
  "maxScore": 100
}
```

**Response:** `201 Created`
```json
{
  "_id": "exam_id",
  "title": "Mathematics Midterm",
  "classId": "class_id",
  "subject": "Mathematics",
  "date": "2023-11-20T00:00:00.000Z",
  "maxScore": 100,
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

### Add Exam Results
```http
POST /exams/results
```

**Headers:**
```
Authorization: Bearer jwt_token
```

**Request Body:**
```json
{
  "examId": "exam_id",
  "studentId": "student_id",
  "score": 85,
  "remarks": "Good performance"
}
```

**Response:** `201 Created`
```json
{
  "_id": "result_id",
  "examId": "exam_id",
  "studentId": "student_id",
  "score": 85,
  "remarks": "Good performance"
}
```

## Report Endpoints

### Generate Class Report
```http
GET /reports/class/:classId?startDate=2023-11-01&endDate=2023-11-30
```

**Headers:**
```
Authorization: Bearer jwt_token
```

**Query Parameters:**
- `startDate` (optional): Start date for report period
- `endDate` (optional): End date for report period

**Response:** `200 OK`
```json
{
  "class": {
    "_id": "class_id",
    "name": "Grade 10A",
    "teacherId": {
      "_id": "teacher_id",
      "name": "Jane Smith",
      "email": "jane@school.com",
      "subject": "Mathematics"
    }
  },
  "reportPeriod": {
    "startDate": "2023-11-01",
    "endDate": "2023-11-30"
  },
  "statistics": {
    "totalStudents": 25,
    "examsCount": 3
  },
  "students": [
    {
      "student": {
        "id": "student_id",
        "name": "John Doe",
        "email": "john@school.com"
      },
      "attendance": {
        "present": 15,
        "absent": 2,
        "late": 1
      },
      "examResults": [
        {
          "examTitle": "Mathematics Midterm",
          "score": 85,
          "maxScore": 100
        }
      ]
    }
  ]
}
```

## Error Responses

### 400 Bad Request
```json
{
  "message": "Invalid request data"
}
```

### 401 Unauthorized
```json
{
  "message": "Not authorized"
}
```

### 404 Not Found
```json
{
  "message": "Resource not found"
}
```

### 500 Server Error
```json
{
  "message": "Internal server error"
}
```
