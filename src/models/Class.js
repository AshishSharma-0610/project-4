import mongoose from 'mongoose';

const classSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a class name'],
    trim: true
  },
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
    required: true
  },
  studentCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

classSchema.index({ name: 1 });

export default mongoose.model('Class', classSchema);