// validationSchemas.js

import * as yup from 'yup';

export const registrationSchema = yup.object().shape({
  role: yup.string().required('Role is required'),
  phone: yup.string().required('Phone is required'),
  address1: yup.string().required('Address Line 1 is required'),
  city: yup.string().required('City is required'),
  state: yup.string().required('State is required'),
  county: yup.string().required('County is required'),
  zip: yup.string().required('Zip is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
  password: yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required'),
  agreeTerms: yup.boolean().oneOf([true], 'Must agree to terms and conditions'),
  agreePrivacyPolicy: yup.boolean().oneOf([true], 'Must agree to privacy policy'),
});


export const loginSchema = yup.object().shape({
  email: yup.string().required('Email or Username is required.'),
  password: yup.string().required('Password is required.'),
});

