import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CoursesValidations } from './course.validation';
import { CourseControllers } from './course.controller';

const router = express.Router();

router.post(
  '/create-course',
  validateRequest(CoursesValidations.createCourseValidationSchema),
  CourseControllers.createCourses,
);

router.get('/', CourseControllers.getAllCourses);

router.get('/:id', CourseControllers.getSingleCourses);

router.patch(
  '/:id',
  validateRequest(CoursesValidations.updateCourseValidationSchema),
  CourseControllers.updateCourse,
);

router.delete('/:id', CourseControllers.deleteCourse);

export const CourseRoutes = router;
