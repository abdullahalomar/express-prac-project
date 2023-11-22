import { Schema, model } from 'mongoose';
// import validator from 'validator';
import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  StudentMethod,
  StudentModel,
  TUserName,
} from './student/student.interface';
import bcrypt from 'bcrypt';
import config from '../config';

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
    password: {
      type: String,
      required: [true, 'password is required'],
      maxlength: [20, 'password ca not be more than 20 character'],
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
    dateOfBirth: { type: String },
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
    isActive: {
      type: String,
      enum: ['active', 'inActive'],
      default: 'active',
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

// creating a custom instance method
// studentSchema.methods.isUserExist = async function (id: string) {
//   const existingUser = await Student.findOne({ id });
//   return existingUser;
// };

// pre save middleware / hook:will work on create() or save() method
studentSchema.pre('save', async function (next) {
  // console.log(this, 'pre hook: we will save data');
  const user = this;
  // hashing password and data save into db
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round),
  );
  next();
});

// post save middleware / hook
studentSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

// query middleware
studentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

studentSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

//[{ '$match': {isDeleted : { $ne: true }} }, { '$match': { id: '72549' } } ]
studentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });

  next();
});

// mongoose virtual
studentSchema.virtual('fullName').get(function () {
  return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`;
});

export const Student = model<TStudent, StudentModel>('Student', studentSchema);
