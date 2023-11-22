import { Joi } from 'joi';

const userNameValidationSchema = Joi.object({
  firstName: Joi.string()
    .trim()
    .required()
    .max(20)
    .pattern(/^[A-Z][a-z]*$/, { name: 'capitalized format' }),
  middleName: Joi.string().trim(),
  lastName: Joi.string()
    .trim()
    .required()
    .pattern(/^[A-Za-z]+$/, { name: 'valid' }),
});

const guardianValidationSchema = Joi.object({
  fatherName: Joi.string().required(),
  fatherOcu: Joi.string().required(),
  fatherConNo: Joi.string().required(),
  motherName: Joi.string().required(),
  motherOcu: Joi.string().required(),
  motherConNo: Joi.string().required(),
});

const localGuardianValidationSchema = Joi.object({
  name: Joi.string().required(),
  occupation: Joi.string().required(),
  contactNo: Joi.string().required(),
  address: Joi.string().required(),
});

const studentValidationSchema = Joi.object({
  id: Joi.string().required(),
  name: userNameValidationSchema.required(),
  gender: Joi.string().valid('Male', 'Female', 'other').required(),
  dateOfBirth: Joi.string(),
  email: Joi.string().email().required(),
  emergencyContactNo: Joi.string().required(),
  blood: Joi.string().valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'),
  presentAddress: Joi.string().required(),
  permanentAddress: Joi.string().required(),
  guardian: guardianValidationSchema.required(),
  localGuardian: localGuardianValidationSchema.required(),
  profileImg: Joi.string().required(),
  isActive: Joi.string().valid('active', 'inActive').default('active'),
});

// export default studentValidationSchema;
