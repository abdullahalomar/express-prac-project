import { Student } from './student.interface';
import { StudentModel } from '../student.model';

const createStudentDb = async (student: Student) => {
  const result = await StudentModel.create(student);
  return result;
};

const getStudentDb = async () => {
  const result = await StudentModel.find();
  return result;
};

const getSingleStudentDb = async (id: string) => {
  const result = await StudentModel.findOne({ id });
  return result;
};

export const studentServices = {
  createStudentDb,
  getStudentDb,
  getSingleStudentDb,
};
