import asyncHandler from 'express-async-handler';
import { Exam, Result } from '../models/Exam.js';
import Class from '../models/Class.js';
import Student from '../models/Student.js';

export const createExam = asyncHandler(async (req, res) => {
  const { title, classId, subject, date, maxScore } = req.body;

  const classExists = await Class.findById(classId);
  if (!classExists) {
    res.status(404);
    throw new Error('Class not found');
  }

  const exam = await Exam.create({
    title,
    classId,
    subject,
    date,
    maxScore
  });

  res.status(201).json(exam);
});

export const addResult = asyncHandler(async (req, res) => {
  const { examId, studentId, score, remarks } = req.body;

  const exam = await Exam.findById(examId);
  if (!exam) {
    res.status(404);
    throw new Error('Exam not found');
  }

  const student = await Student.findOne({ _id: studentId, isDeleted: false });
  if (!student) {
    res.status(404);
    throw new Error('Student not found');
  }

  if (score > exam.maxScore) {
    res.status(400);
    throw new Error(`Score cannot exceed maximum score of ${exam.maxScore}`);
  }

  const result = await Result.create({
    examId,
    studentId,
    score,
    remarks
  });

  res.status(201).json(result);
});

export const getExamResults = asyncHandler(async (req, res) => {
  const { examId } = req.params;

  const exam = await Exam.findById(examId);
  if (!exam) {
    res.status(404);
    throw new Error('Exam not found');
  }

  const results = await Result.find({ examId })
    .populate('studentId', 'name email')
    .sort('-score');

  res.json({
    exam,
    results
  });
});