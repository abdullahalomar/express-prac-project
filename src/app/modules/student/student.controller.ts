import httpStatus from 'http-status';
import { studentServices } from './student.service';
import sendResponse from '../../utilities/sendResponse';
import catchAsync from '../../utilities/catchAsync';
// import studentValidationSchema from './student.validation';

const getAllStudent = catchAsync(async (req, res) => {
  const result = await studentServices.getStudentDb();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'student are retrieve successfully',
    data: result,
  });
});

const getSingleStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await studentServices.getSingleStudentDb(studentId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'get a single student',
    data: result,
  });
});

const deleteStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await studentServices.deleteStudentDb(studentId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'student deleted successfully',
    data: result,
  });
});

export const studentControllers = {
  getAllStudent,
  getSingleStudent,
  deleteStudent,
};
