import { StudentModel } from './student.interface';
import { Model } from 'mongoose';

export type TGuardian = {
  fatherName: string;
  fatherOcu: string;
  fatherConNo: string;
  motherName: string;
  motherOcu: string;
  motherConNo: string;
};

export type TLocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

export type TUserName = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export type TStudent = {
  id: string;
  password: string;
  name: TUserName;
  gender: 'Male' | 'Female';
  dateOfBirth?: string;
  email: string;
  emergencyContactNo: string;
  blood?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  profileImg: string;
  isActive: 'active' | 'inActive';
  isDeleted: boolean;
};

//using static method
export interface StudentModel extends Model<TStudent> {
  isUserExist(id: string): Promise<TStudent | null>;
}

// using custom instance method
// export type StudentMethod = {
//   isUserExist(id: string): Promise<TStudent | null>;
// };

// export type StudentModel = Model<
//   TStudent,
//   Record<string, never>,
//   StudentMethod
// >;
