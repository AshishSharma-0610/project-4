import asyncHandler from 'express-async-handler';
import Class from '../models/Class.js';
import Teacher from '../models/Teacher.js';

export const createClass = asyncHandler(async (req, res) => {
  const { name, teacherId } = req.body;

  const teacher = await Teacher.findOne({ _id: teacherId, isDeleted: false });
  if (!teacher) {
    res.status(404);
    throw new Error('Teacher not found');
  }

  const classExists = await Class.findOne({ name });
  if (classExists) {
    res.status(400);
    throw new Error('Class already exists');
  }

  const newClass = await Class.create({
    name,
    teacherId
  });

  res.status(201).json(newClass);
});

export const getClasses = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const classes = await Class.find()
    .populate('teacherId', 'name email subject')
    .skip((page - 1) * limit)
    .limit(limit);

  const total = await Class.countDocuments();

  res.json({
    classes,
    page,
    pages: Math.ceil(total / limit),
    total
  });
});

export const getClassById = asyncHandler(async (req, res) => {
  const classItem = await Class.findById(req.params.id)
    .populate('teacherId', 'name email subject');

  if (!classItem) {
    res.status(404);
    throw new Error('Class not found');
  }

  res.json(classItem);
});

export const updateClass = asyncHandler(async (req, res) => {
  const classItem = await Class.findById(req.params.id);

  if (!classItem) {
    res.status(404);
    throw new Error('Class not found');
  }

  if (req.body.teacherId) {
    const teacher = await Teacher.findOne({ 
      _id: req.body.teacherId, 
      isDeleted: false 
    });
    if (!teacher) {
      res.status(404);
      throw new Error('Teacher not found');
    }
  }

  const updatedClass = await Class.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  ).populate('teacherId', 'name email subject');

  res.json(updatedClass);
});

export const deleteClass = asyncHandler(async (req, res) => {
  const classItem = await Class.findById(req.params.id);

  if (!classItem) {
    res.status(404);
    throw new Error('Class not found');
  }

  await classItem.deleteOne();
  res.json({ message: 'Class removed' });
});