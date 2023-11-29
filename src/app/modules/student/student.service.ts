import { Student } from './student.model';

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
  getStudentDb,
  getSingleStudentDb,
  deleteStudentDb,
};
