import mongoose from 'mongoose';

const examSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  classId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class',
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  maxScore: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

const resultSchema = new mongoose.Schema({
  examId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exam',
    required: true
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  score: {
    type: Number,
    required: true
  },
  remarks: String
});

resultSchema.index({ examId: 1, studentId: 1 }, { unique: true });

export const Exam = mongoose.model('Exam', examSchema);
export const Result = mongoose.model('Result', resultSchema);