import asyncHandler from 'express-async-handler';
import Attendance from '../models/Attendance.js';
import Student from '../models/Student.js';
import Class from '../models/Class.js';

export const markAttendance = asyncHandler(async (req, res) => {
  const { studentId, classId, status, note } = req.body;
  const date = new Date(req.body.date);

  // Validate student and class
  const student = await Student.findOne({ _id: studentId, isDeleted: false });
  if (!student) {
    res.status(404);
    throw new Error('Student not found');
  }

  const classExists = await Class.findById(classId);
  if (!classExists) {
    res.status(404);
    throw new Error('Class not found');
  }

  // Check for existing attendance
  const existingAttendance = await Attendance.findOne({
    studentId,
    classId,
    date: {
      $gte: new Date(date.setHours(0, 0, 0)),
      $lt: new Date(date.setHours(23, 59, 59))
    }
  });

  if (existingAttendance) {
    existingAttendance.status = status;
    existingAttendance.note = note;
    await existingAttendance.save();
    res.json(existingAttendance);
  } else {
    const attendance = await Attendance.create({
      studentId,
      classId,
      date,
      status,
      note
    });
    res.status(201).json(attendance);
  }
});

export const getAttendance = asyncHandler(async (req, res) => {
  const { classId, date, studentId } = req.query;
  const query = {};

  if (classId) query.classId = classId;
  if (studentId) query.studentId = studentId;
  if (date) {
    const queryDate = new Date(date);
    query.date = {
      $gte: new Date(queryDate.setHours(0, 0, 0)),
      $lt: new Date(queryDate.setHours(23, 59, 59))
    };
  }

  const attendance = await Attendance.find(query)
    .populate('studentId', 'name email')
    .populate('classId', 'name');

  res.json(attendance);
});