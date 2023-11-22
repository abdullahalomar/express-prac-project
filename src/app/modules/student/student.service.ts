import { Student } from './../student.model';
import { TStudent } from './student.interface';
import { Student } from '../student.model';

// const createStudentDb = async (student: Student) => {
//   const result = await Student.create(studentData);
//   return result;
// };

// create student with built in instance method
const createStudentDb = async (studentData: TStudent) => {
  if (await Student.isUserExist(studentData.id)) {
    throw new Error('User already exist!');
  }

  const result = await Student.create(studentData);
  // const student = new Student(studentData); //create an instance

  // if (await student.isUserExist(studentData.id)) {
  //   throw new Error('User already exist!');
  // }
  // const result = await student.save();
  return result;
};

const getStudentDb = async () => {
  const result = await Student.find();
  return result;
};

const getSingleStudentDb = async (id: string) => {
  // const result = await Student.findOne({ id });
  //use aggregate
  const result = await Student.aggregate([{ $match: { id: id } }]);
  return result;
};

const deleteStudentDb = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true });
  return result;
};

export const studentServices = {
  createStudentDb,
  getStudentDb,
  getSingleStudentDb,
  deleteStudentDb,
};
