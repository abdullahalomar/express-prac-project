import express from 'express';
import { AcademicSemesterControllers } from './academicSemester.controller';
import validateRequest from '../../middlewares/validateRequest';
import { academicSemesterValidation } from './academicSemester.validation';

const router = express.Router();
// create
router.post(
  '/create-academic-semester',
  validateRequest(
    academicSemesterValidation.createAcademicSemesterValidationSchema,
  ),
  AcademicSemesterControllers.createAcademicSemester,
);

// get all
router.get('/', AcademicSemesterControllers.getAllAcademicSemester);

// get single
router.get(
  '/:semesterId',
  AcademicSemesterControllers.getSingleAcademicSemester,
);

// update
router.patch(
  '/:semesterId',
  validateRequest(
    academicSemesterValidation.updateAcademicSemesterValidationSchema,
  ),
  AcademicSemesterControllers.updateAcademicSemester,
);

export const AcademicSemesterRoutes = router;
