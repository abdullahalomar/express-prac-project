import { TAcademicDepartment } from './academicDepartment.interface';
import { AcademicDepartment } from './academicDepartment.model';

const createAcademicDepartmentDB = async (payload: TAcademicDepartment) => {
  const result = AcademicDepartment.create(payload);
  return result;
};

const getAllAcademicDepartmentDB = async () => {
  const result = AcademicDepartment.find().populate('academicFaculty');
  return result;
};

const getSingleAcademicDepartmentDB = async (id: string) => {
  const result = AcademicDepartment.findById(id).populate('academicFaculty');
  return result;
};

const updateAcademicDepartmentDB = async (
  id: string,
  payload: Partial<TAcademicDepartment>,
) => {
  const result = await AcademicDepartment.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    },
  );
  return result;
};

export const AcademicDepartmentServices = {
  createAcademicDepartmentDB,
  getAllAcademicDepartmentDB,
  getSingleAcademicDepartmentDB,
  updateAcademicDepartmentDB,
};
