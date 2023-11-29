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
      dateOfBirth: z.date().optional(),
      email: z.string().min(1).email(),
      emergencyContactNo: z.string().min(1),
      blood: BloodTypeEnum.optional(),
      presentAddress: z.string().min(1),
      permanentAddress: z.string().min(1),
      guardian: guardianValidationSchema,
      localGuardian: localGuardianValidationSchema,
      profileImg: z.string().min(1),
    }),
  }),
});

export const studentValidations = {
  studentValidationSchema: createStudentValidationSchema,
};
