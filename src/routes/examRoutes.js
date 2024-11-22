import express from 'express';
import { protect, admin } from '../middleware/auth.js';
import { 
  createExam, 
  addResult, 
  getExamResults 
} from '../controllers/examController.js';

const router = express.Router();

router.post('/', protect, admin, createExam);
router.post('/results', protect, addResult);
router.get('/:examId/results', protect, getExamResults);

export default router;