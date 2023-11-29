import express from 'express';
import { AcademicSemesterControllers } from './academicSemester.controller';
import validateRequest from '../../middlewares/validateRequest';
import { academicSemesterValidation } from './academicSemester.validation';

const router = express.Router();

router.post(
  '/create-academic-semester',
  validateRequest(
    academicSemesterValidation.createAcademicSemesterValidationSchema,
  ),
  AcademicSemesterControllers.createAcademicSemester,
);
// router.get('/', studentControllers.getAllStudent);
// router.get('/:studentId', studentControllers.getSingleStudent);
// router.delete('/:studentId', studentControllers.deleteStudent);

export const AcademicSemesterRoutes = router;