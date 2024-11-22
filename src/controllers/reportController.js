import asyncHandler from 'express-async-handler';
import Class from '../models/Class.js';
import Student from '../models/Student.js';
import { Result, Exam } from '../models/Exam.js';
import Attendance from '../models/Attendance.js';

export const generateClassReport = asyncHandler(async (req, res) => {
  const { classId } = req.params;
  const { startDate, endDate } = req.query;

  const classDetails = await Class.findById(classId)
    .populate('teacherId', 'name email subject');

  if (!classDetails) {
    res.status(404);
    throw new Error('Class not found');
  }

  // Get students in class
  const students = await Student.find({ 
    classId, 
    isDeleted: false 
  });

  // Get attendance statistics
  const attendanceQuery = { classId };
  if (startDate && endDate) {
    attendanceQuery.date = {
      $gte: new Date(startDate),
      $lte: new Date(endDate)
    };
  }

  const attendance = await Attendance.find(attendanceQuery);

  // Get exams and results
  const exams = await Exam.find({ classId });
  const examIds = exams.map(exam => exam._id);
  const results = await Result.find({ 
    examId: { $in: examIds }
  });

  // Compile student statistics
  const studentStats = await Promise.all(students.map(async (student) => {
    const studentAttendance = attendance.filter(a => 
      a.studentId.toString() === student._id.toString()
    );

    const studentResults = results.filter(r => 
      r.studentId.toString() === student._id.toString()
    );

    const attendanceStats = {
      present: studentAttendance.filter(a => a.status === 'present').length,
      absent: studentAttendance.filter(a => a.status === 'absent').length,
      late: studentAttendance.filter(a => a.status === 'late').length,
    };

    const examResults = await Promise.all(exams.map(async (exam) => {
      const result = studentResults.find(r => 
        r.examId.toString() === exam._id.toString()
      );
      return {
        examTitle: exam.title,
        score: result ? result.score : 'N/A',
        maxScore: exam.maxScore
      };
    }));

    return {
      student: {
        id: student._id,
        name: student.name,
        email: student.email
      },
      attendance: attendanceStats,
      examResults
    };
  }));

  res.json({
    class: classDetails,
    reportPeriod: {
      startDate: startDate || 'All time',
      endDate: endDate || 'All time'
    },
    statistics: {
      totalStudents: students.length,
      examsCount: exams.length
    },
    students: studentStats
  });
});