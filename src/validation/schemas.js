import Joi from 'joi';

export const studentSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  classId: Joi.string().required(),
});

export const teacherSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  subject: Joi.string().required(),
});

export const classSchema = Joi.object({
  name: Joi.string().required(),
  teacherId: Joi.string().required(),
});

export const userSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid('admin', 'teacher').default('teacher'),
});