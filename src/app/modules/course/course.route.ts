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

router.put(
  '/:courseId/assign-faculties',
  validateRequest(CoursesValidations.facultiesWithCourseValidationSchema),
  CourseControllers.assignFacultiesWithCourse,
);

router.delete(
  '/:courseId/remove-faculties',
  validateRequest(CoursesValidations.facultiesWithCourseValidationSchema),
  CourseControllers.removeFacultiesFromCourse,
);

router.delete('/:id', CourseControllers.deleteCourse);

export const CourseRoutes = router;
