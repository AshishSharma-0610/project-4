import express from 'express';
import { protect, admin } from '../middleware/auth.js';
import { markAttendance, getAttendance } from '../controllers/attendanceController.js';

const router = express.Router();

router.route('/')
  .post(protect, markAttendance)
  .get(protect, getAttendance);

export default router;