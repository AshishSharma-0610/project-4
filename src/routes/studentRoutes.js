import express from 'express';
import { protect, admin } from '../middleware/auth.js';
import uploadMiddleware from '../middleware/upload.js';
import { validateStudent } from '../middleware/validate.js';
import {
  addStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
} from '../controllers/studentController.js';

const router = express.Router();

router.route('/')
  .post(protect, admin, validateStudent, addStudent)
  .get(protect, getStudents);

router.route('/:id')
  .get(protect, getStudentById)
  .put(protect, admin, uploadMiddleware('profileImage'), validateStudent, updateStudent)
  .delete(protect, admin, deleteStudent);

export default router;