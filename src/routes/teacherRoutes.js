import express from 'express';
import { protect, admin } from '../middleware/auth.js';
import uploadMiddleware from '../middleware/upload.js';
import { validateTeacher } from '../middleware/validate.js';
import {
  addTeacher,
  getTeachers,
  getTeacherById,
  updateTeacher,
  deleteTeacher,
} from '../controllers/teacherController.js';

const router = express.Router();

router.route('/')
  .post(protect, admin, validateTeacher, addTeacher)
  .get(protect, getTeachers);

router.route('/:id')
  .get(protect, getTeacherById)
  .put(protect, admin, uploadMiddleware('profileImage'), validateTeacher, updateTeacher)
  .delete(protect, admin, deleteTeacher);

export default router;