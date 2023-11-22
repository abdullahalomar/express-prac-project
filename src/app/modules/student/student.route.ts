import express from 'express';
import { studentControllers } from './student.controller';

const router = express.Router();

//will call controller func
router.post('/create-student', studentControllers.createStudent);
router.get('/', studentControllers.getAllStudent);
router.get('/:studentId', studentControllers.getSingleStudent);
router.delete('/:studentId', studentControllers.deleteStudent);

export const studentRoutes = router;
