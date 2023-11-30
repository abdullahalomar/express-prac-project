/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose';
// import validator from 'validator';
import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  StudentModel,
  TUserName,
} from './student.interface';

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First name is must be required'],
    trim: true,
    maxlength: [20, 'first name can not be more than 20 characters'],
  },
  middleName: { type: String, trim: true },
  lastName: {
    type: String,
    trim: true,
    required: [true, 'Last name is must be required'],
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    required: [true, 'Father name is must be required'],
  },
  fatherOcu: {
    type: String,
    required: [true, 'Father occupation is must be required'],
  },
  fatherConNo: {
    type: String,
    required: [true, 'Father contact number is must be required'],
  },
  motherName: {
    type: String,
    required: [true, 'Mother name is must be required'],
  },
  motherOcu: {
    type: String,
    required: [true, 'Mother occupation is must be required'],
  },
  motherConNo: {
    type: String,
    required: [true, 'Mother contact number is must be required'],
  },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    required: [true, 'Local guardian name is must be required'],
  },
  occupation: {
    type: String,
    required: [true, 'Local guardian occupation is must be required'],
  },
  contactNo: {
    type: String,
    required: [true, 'Local guardian contact number is must be required'],
  },
  address: {
    type: String,
    required: [true, 'Local guardian address is must be required'],
  },
});

const studentSchema = new Schema<TStudent, StudentModel>(
  {
    id: { type: String, required: [true, 'id is required'], unique: true },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User id must be required'],
      unique: true,
      ref: 'User',
    },
    name: {
      type: userNameSchema,
      required: true,
    },
    gender: {
      type: String,
      enum: {
        values: ['Male', 'Female', 'other'],
        message:
          "{VALUE} is not valid. The gender field can only be on of the following: 'Male', 'Female' or 'other'.",
      },
      required: true,
    },
    dateOfBirth: { type: Date },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    emergencyContactNo: { type: String, required: true },
    blood: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },
    presentAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    guardian: {
      type: guardianSchema,
      required: true,
    },
    localGuardian: {
      type: localGuardianSchema,
      required: true,
    },
    profileImg: { type: String, required: true },
    admissionSemester: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicSemester',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

// creating a custom static method
studentSchema.statics.isUserExist = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};

// query middleware
studentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

studentSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

studentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });

  next();
});

// mongoose virtual
studentSchema.virtual('fullName').get(function () {
  return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`;
});

export const Student = model<TStudent, StudentModel>('Student', studentSchema);
