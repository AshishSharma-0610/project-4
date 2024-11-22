import express from 'express';
import { protect } from '../middleware/auth.js';
import { generateClassReport } from '../controllers/reportController.js';

const router = express.Router();

router.get('/class/:classId', protect, generateClassReport);

export default router;