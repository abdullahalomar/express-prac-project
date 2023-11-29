import httpStatus from 'http-status';
import { RequestHandler } from 'express';
import { UserServices } from './user.service';
import sendResponse from '../../utilities/sendResponse';
import catchAsync from '../../utilities/catchAsync';

const createStudent: RequestHandler = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body;

  const result = await UserServices.createStudentDB(password, studentData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'student created successfully',
    data: result,
  });
});

export const UserControllers = {
  createStudent,
};