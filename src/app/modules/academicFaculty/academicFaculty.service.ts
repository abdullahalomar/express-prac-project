import { TAcademicFaculty } from './academicFaculty.interface';
import { AcademicFaculty } from './academicFaculty.model';

const createAcademicFacultyDB = async (payload: TAcademicFaculty) => {
  const result = AcademicFaculty.create(payload);
  return result;
};

const getAllAcademicFacultiesDB = async () => {
  const result = AcademicFaculty.find();
  return result;
};

const getSingleAcademicFacultyDB = async (id: string) => {
  const result = AcademicFaculty.findById(id);
  return result;
};

const updateAcademicFacultyDB = async (
  id: string,
  payload: Partial<TAcademicFaculty>,
) => {
  const result = await AcademicFaculty.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

export const AcademicFacultyServices = {
  createAcademicFacultyDB,
  getAllAcademicFacultiesDB,
  getSingleAcademicFacultyDB,
  updateAcademicFacultyDB,
};
