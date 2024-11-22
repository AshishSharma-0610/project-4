import asyncHandler from 'express-async-handler';
import Student from '../models/Student.js';
import Class from '../models/Class.js';
import { cloudinary } from '../config/cloudinary.js';
import fs from 'fs/promises';

export const addStudent = asyncHandler(async (req, res) => {
  const { name, email, classId } = req.body;

  const classExists = await Class.findById(classId);
  if (!classExists) {
    res.status(404);
    throw new Error('Class not found');
  }

  const student = await Student.create({
    name,
    email,
    classId
  });

  await Class.findByIdAndUpdate(classId, { $inc: { studentCount: 1 } });

  res.status(201).json(student);
});

export const getStudents = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const classId = req.query.classId;

  const query = { isDeleted: false };
  if (classId) query.classId = classId;

  const students = await Student.find(query)
    .skip((page - 1) * limit)
    .limit(limit)
    .populate('classId', 'name');

  const total = await Student.countDocuments(query);

  res.json({
    students,
    page,
    pages: Math.ceil(total / limit),
    total
  });
});

export const getStudentById = asyncHandler(async (req, res) => {
  const student = await Student.findOne({
    _id: req.params.id,
    isDeleted: false
  }).populate('classId', 'name');

  if (!student) {
    res.status(404);
    throw new Error('Student not found');
  }

  res.json(student);
});

export const updateStudent = asyncHandler(async (req, res) => {
  const student = await Student.findOne({
    _id: req.params.id,
    isDeleted: false
  });

  if (!student) {
    res.status(404);
    throw new Error('Student not found');
  }

  const updateData = { ...req.body };

  if (req.file) {
    try {
      // If there's an existing profile image, delete it from Cloudinary
      if (student.profileImageUrl) {
        const publicId = student.profileImageUrl.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(`school-management/${publicId}`);
      }

      // Upload new image
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'school-management',
        transformation: [{ width: 500, height: 500, crop: 'limit' }]
      });

      updateData.profileImageUrl = result.secure_url;

      // Clean up the temporary file
      await fs.unlink(req.file.path);
    } catch (error) {
      res.status(500);
      throw new Error('Error uploading image to Cloudinary');
    }
  }

  // Handle class change
  if (updateData.classId && updateData.classId !== student.classId.toString()) {
    const newClass = await Class.findById(updateData.classId);
    if (!newClass) {
      res.status(404);
      throw new Error('New class not found');
    }

    // Update student counts for both old and new classes
    await Promise.all([
      Class.findByIdAndUpdate(student.classId, { $inc: { studentCount: -1 } }),
      Class.findByIdAndUpdate(updateData.classId, { $inc: { studentCount: 1 } })
    ]);
  }

  const updatedStudent = await Student.findByIdAndUpdate(
    req.params.id,
    updateData,
    { new: true }
  ).populate('classId', 'name');

  res.json(updatedStudent);
});

export const deleteStudent = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.params.id);

  if (!student) {
    res.status(404);
    throw new Error('Student not found');
  }

  student.isDeleted = true;
  await student.save();

  await Class.findByIdAndUpdate(student.classId, { $inc: { studentCount: -1 } });

  res.json({ message: 'Student removed' });
});