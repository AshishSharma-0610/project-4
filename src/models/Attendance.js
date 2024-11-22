import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  classId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['present', 'absent', 'late'],
    required: true
  },
  note: {
    type: String
  }
}, {
  timestamps: true
});

attendanceSchema.index({ studentId: 1, date: 1 });
attendanceSchema.index({ classId: 1, date: 1 });

export default mongoose.model('Attendance', attendanceSchema);