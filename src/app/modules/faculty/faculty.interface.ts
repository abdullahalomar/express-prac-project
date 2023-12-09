/* eslint-disable no-unused-vars */
import { Types, Model } from 'mongoose';

export type TGender = 'male' | 'female' | 'other';
export type TUserName = {
  firstName: string;
  middleName: string;
  lastName: string;
};
export type TBloodGroup =
  | 'A'
  | 'B'
  | 'AB'
  | 'O'
  | 'A+'
  | 'B+'
  | 'AB+'
  | 'O+'
  | 'A-'
  | 'B-'
  | 'AB-'
  | 'O-';

export type TFaculty = {
  id: string;
  user: Types.ObjectId;
  name: TUserName;
  designation: string;
  gender: TGender;
  dateOfBirth: Date;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: TBloodGroup;
  presentAddress: string;
  permanentAddress: string;
  profileImage?: string;
  academicFaculty: Types.ObjectId;
  academicDepartment: Types.ObjectId;
  isDeleted: boolean;
};

export interface FacultyModel extends Model<TFaculty> {
  isUserExists(id: string): Promise<TFaculty | null>;
}
