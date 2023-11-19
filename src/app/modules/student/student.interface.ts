import { Schema, model, connect } from 'mongoose';

export type Guardian = {
  fatherName: string;
  fatherOcu: string;
  fatherConNo: string;
  motherName: string;
  motherOcu: string;
  motherConNo: string;
};

export type LocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

export type UserName = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export type Student = {
  id: string;
  name: UserName;
  gender: 'Male' | 'Female';
  dateOfBirth?: string;
  email: string;
  emergencyContactNo: string;
  blood?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  guardian: Guardian;
  localGuardian: LocalGuardian;
  profileImg: string;
  isActive: 'active' | 'inActive';
};
