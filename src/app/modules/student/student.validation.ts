import { z } from 'zod';

const GenderEnum = z.enum(['Male', 'Female', 'other']);
const BloodTypeEnum = z.enum([
  'A+',
  'A-',
  'B+',
  'B-',
  'AB+',
  'AB-',
  'O+',
  'O-',
]);

const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(1)
    .max(20)
    .trim()
    .refine(
      (value) => {
        const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
        return firstNameStr === value;
      },
      {
        message: 'First name must be in capitalized format',
      },
    ),
  middleName: z.string().trim(),
  lastName: z.string().trim().min(1),
});

const guardianValidationSchema = z.object({
  fatherName: z.string().min(1),
  fatherOcu: z.string().min(1),
  fatherConNo: z.string().min(1),
  motherName: z.string().min(1),
  motherOcu: z.string().min(1),
  motherConNo: z.string().min(1),
});

const localGuardianValidationSchema = z.object({
  name: z.string().min(1),
  occupation: z.string().min(1),
  contactNo: z.string().min(1),
  address: z.string().min(1),
});

const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20),
    student: z.object({
      name: userNameValidationSchema,
      gender: GenderEnum,
      dateOfBirth: z.string().optional(),
      email: z.string().min(1).email(),
      contactNo: z.string().min(1),
      emergencyContactNo: z.string().min(1),
      blood: BloodTypeEnum.optional(),
      presentAddress: z.string().min(1),
      permanentAddress: z.string().min(1),
      guardian: guardianValidationSchema,
      localGuardian: localGuardianValidationSchema,
      admissionSemester: z.string(),
      academicDepartment: z.string(),
      profileImg: z.string().min(1),
    }),
  }),
});

// update
const updateGenderEnum = z.enum(['Male', 'Female', 'other']).optional();
const updateBloodTypeEnum = z
  .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
  .optional();

const updateUserNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(1)
    .max(20)
    .trim()
    .refine(
      (value) => {
        const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
        return firstNameStr === value;
      },
      {
        message: 'First name must be in capitalized format',
      },
    )
    .optional(),
  middleName: z.string().trim().optional(),
  lastName: z.string().trim().min(1).optional(),
});

const updateGuardianValidationSchema = z.object({
  fatherName: z.string().min(1).optional(),
  fatherOcu: z.string().min(1).optional(),
  fatherConNo: z.string().min(1).optional(),
  motherName: z.string().min(1).optional(),
  motherOcu: z.string().min(1).optional(),
  motherConNo: z.string().min(1).optional(),
});

const updateLocalGuardianValidationSchema = z.object({
  name: z.string().min(1).optional(),
  occupation: z.string().min(1).optional(),
  contactNo: z.string().min(1).optional(),
  address: z.string().min(1).optional(),
});

const updateStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20).optional(),
    student: z.object({
      name: updateUserNameValidationSchema.optional(),
      gender: updateGenderEnum.optional(),
      dateOfBirth: z.string().optional(),
      email: z.string().min(1).email().optional(),
      contactNo: z.string().min(1).optional(),
      emergencyContactNo: z.string().min(1).optional(),
      blood: updateBloodTypeEnum.optional(),
      presentAddress: z.string().min(1).optional(),
      permanentAddress: z.string().min(1).optional(),
      guardian: updateGuardianValidationSchema.optional(),
      localGuardian: updateLocalGuardianValidationSchema.optional(),
      admissionSemester: z.string().optional(),
      academicDepartment: z.string().optional(),
      profileImg: z.string().min(1).optional(),
    }),
  }),
});

export const studentValidations = {
  studentValidationSchema: createStudentValidationSchema,
  updateStudentValidationSchema,
};
