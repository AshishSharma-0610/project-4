import asyncHandler from 'express-async-handler';
import Teacher from '../models/Teacher.js';
import { cloudinary } from '../config/cloudinary.js';
import fs from 'fs/promises';

export const addTeacher = asyncHandler(async (req, res) => {
  const { name, email, subject } = req.body;

  const teacherExists = await Teacher.findOne({ email });
  if (teacherExists) {
    res.status(400);
    throw new Error('Teacher already exists');
  }

  const teacher = await Teacher.create({
    name,
    email,
    subject
  });

  res.status(201).json(teacher);
});

export const getTeachers = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const teachers = await Teacher.find({ isDeleted: false })
    .skip((page - 1) * limit)
    .limit(limit);

  const total = await Teacher.countDocuments({ isDeleted: false });

  res.json({
    teachers,
    page,
    pages: Math.ceil(total / limit),
    total
  });
});

export const getTeacherById = asyncHandler(async (req, res) => {
  const teacher = await Teacher.findOne({
    _id: req.params.id,
    isDeleted: false
  });

  if (!teacher) {
    res.status(404);
    throw new Error('Teacher not found');
  }

  res.json(teacher);
});

export const updateTeacher = asyncHandler(async (req, res) => {
  const teacher = await Teacher.findOne({
    _id: req.params.id,
    isDeleted: false
  });

  if (!teacher) {
    res.status(404);
    throw new Error('Teacher not found');
  }

  const updateData = { ...req.body };

  if (req.file) {
    try {
      // If there's an existing profile image, delete it from Cloudinary
      if (teacher.profileImageUrl) {
        const publicId = teacher.profileImageUrl.split('/').pop().split('.')[0];
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

  const updatedTeacher = await Teacher.findByIdAndUpdate(
    req.params.id,
    updateData,
    { new: true }
  );

  res.json(updatedTeacher);
});

export const deleteTeacher = asyncHandler(async (req, res) => {
  const teacher = await Teacher.findById(req.params.id);

  if (!teacher) {
    res.status(404);
    throw new Error('Teacher not found');
  }

  teacher.isDeleted = true;
  await teacher.save();

  res.json({ message: 'Teacher removed' });
});