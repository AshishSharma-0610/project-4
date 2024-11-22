import express from 'express';
import { protect, admin } from '../middleware/auth.js';
import {
  createClass,
  getClasses,
  getClassById,
  updateClass,
  deleteClass,
} from '../controllers/classController.js';

const router = express.Router();

router.route('/')
  .post(protect, admin, createClass)
  .get(protect, getClasses);

router.route('/:id')
  .get(protect, getClassById)
  .put(protect, admin, updateClass)
  .delete(protect, admin, deleteClass);

export default router;