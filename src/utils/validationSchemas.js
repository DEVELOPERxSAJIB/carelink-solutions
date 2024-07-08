// validationSchemas.js
import * as yup from 'yup';

export const registrationSchema = yup.object().shape({
  role: yup.string().required('Role is required'),
  phone: yup.string().required('Phone is required').min(11, 'Phone must be at least 11 characters'),
  address1: yup.string().required('Address Line 1 is required'),
  address2: yup.string().notRequired(),
  zip: yup.string().required('Zip is required').min(4, 'Zip must be at least 4 characters').max(10, 'Zip must be at most 10 characters'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  firstName: yup.string().required('First Name is required').min(3, 'First Name must be at least 3 characters').max(32, 'First Name must be at most 32 characters'),
  lastName: yup.string().required('Last Name is required').min(3, 'Last Name must be at least 3 characters').max(32, 'Last Name must be at most 32 characters'),
  password: yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required'),
  agreeTerms: yup.boolean().oneOf([true], 'Must agree to terms and conditions'),
  agreePrivacyPolicy: yup.boolean().oneOf([true], 'Must agree to privacy policy'),
});

export const loginSchema = yup.object().shape({
  email: yup.string().required('Email or Username is required'),
  password: yup.string().required('Password is required'),
});
// create company 

export const companyProfileSchema = yup.object().shape({
  companyName: yup.string().trim().required('Company name is required'),
  providerNumber: yup.string().required('Provider number is required'),
  businessEntityId: yup.string().nullable().default(null),
  medicaidIdentifier: yup.string().nullable().default(null),
  evvUsername: yup.string().nullable().default(null),
  medicaidNumber: yup.string().nullable().default(null),
  evvPassword: yup.string().nullable().default(null),
  address1: yup.string().required('Address Line 1 is required'),
  address2: yup.string().nullable().default(null),
  securityPin: yup.string(),
  zip: yup.string()
    .required('Zip is required')
    .min(4, 'Zip must be at least 4 characters')
    .max(10, 'Zip must be at most 10 characters'),
  email: yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  firstName: yup.string()
    .required('First Name is required')
    .min(3, 'First Name must be at least 3 characters')
    .max(32, 'First Name must be at most 32 characters'),
  lastName: yup.string()
    .required('Last Name is required')
    .min(3, 'Last Name must be at least 3 characters')
    .max(32, 'Last Name must be at most 32 characters'),
  password: yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});
export const changePasswordSchema = yup.object().shape({
  oldPassword: yup.string().required('Old password is required'),
  newPassword: yup
    .string()
    .required('New password is required')
    .min(6, 'Password must be at least 6 characters long'),
  confirmNewPassword: yup
    .string()
    .required('Confirm password is required')
    .oneOf([yup.ref('newPassword'), null], 'Passwords must match')
});