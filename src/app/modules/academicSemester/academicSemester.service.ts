import { AcademicSemesterNameCodeMapper } from './academicSemester.constant';
import { TAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';

// create semester
const createAcademicSemesterDB = async (payload: TAcademicSemester) => {
  const result = await AcademicSemester.create(payload);

  if (AcademicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new Error('Invalid Semester Code');
  }
  return result;
};

// get all semester
const getAllAcademicSemesterDB = async () => {
  const result = await AcademicSemester.find();
  return result;
};

// get single semester
const getSingleAcademicSemesterDB = async (id: string) => {
  const result = await AcademicSemester.findById(id);
  return result;
};

// update semester
const updateAcademicSemesterDB = async (
  id: string,
  payload: Partial<TAcademicSemester>,
) => {
  // if (
  //   payload.name &&
  //   payload.code &&
  //   AcademicSemesterNameCodeMapper[payload.code] !== payload.code
  // ) {
  //   throw new Error('Invalid semester code');
  // }

  if (
    payload.name &&
    payload.code &&
    AcademicSemesterNameCodeMapper[payload.name] !== payload.code
  ) {
    throw new Error('Invalid Semester Code');
  }
  const result = await AcademicSemester.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

export const AcademicSemesterServices = {
  createAcademicSemesterDB,
  getAllAcademicSemesterDB,
  getSingleAcademicSemesterDB,
  updateAcademicSemesterDB,
};
