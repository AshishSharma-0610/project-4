import { studentSchema, teacherSchema, classSchema, userSchema } from '../validation/schemas.js';

const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    res.status(400);
    throw new Error(error.details[0].message);
  }
  next();
};

export const validateStudent = validate(studentSchema);
export const validateTeacher = validate(teacherSchema);
export const validateClass = validate(classSchema);
export const validateUser = validate(userSchema);