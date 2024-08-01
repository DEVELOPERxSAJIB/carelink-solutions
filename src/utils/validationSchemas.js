// validationSchemas.js
import * as yup from "yup";

export const registrationSchema = yup.object().shape({
  role: yup.string().required("Role is required"),
  phone: yup
    .string()
    .required("Phone is required")
    .min(11, "Phone must be at least 11 characters"),
  address1: yup.string().required("Address Line 1 is required"),
  address2: yup.string().notRequired(),
  zip: yup
    .string()
    .required("Zip is required")
    .min(4, "Zip must be at least 4 characters")
    .max(10, "Zip must be at most 10 characters"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  firstName: yup
    .string()
    .required("First Name is required")
    .min(3, "First Name must be at least 3 characters")
    .max(32, "First Name must be at most 32 characters"),
  lastName: yup
    .string()
    .required("Last Name is required")
    .min(3, "Last Name must be at least 3 characters")
    .max(32, "Last Name must be at most 32 characters"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
  agreeTerms: yup.boolean().oneOf([true], "Must agree to terms and conditions"),
  agreePrivacyPolicy: yup
    .boolean()
    .oneOf([true], "Must agree to privacy policy"),
});
export const updateregistrationSchema = yup.object().shape({
  phone: yup
    .string()
    .required("Phone is required")
    .min(11, "Phone must be at least 11 characters"),
  address1: yup.string().required("Address Line 1 is required"),
  address2: yup.string().notRequired(),
  zip: yup
    .string()
    .required("Zip is required")
    .min(4, "Zip must be at least 4 characters")
    .max(10, "Zip must be at most 10 characters"),
  firstName: yup
    .string()
    .required("First Name is required")
    .min(3, "First Name must be at least 3 characters")
    .max(32, "First Name must be at most 32 characters"),
  lastName: yup
    .string()
    .required("Last Name is required")
    .min(3, "Last Name must be at least 3 characters")
    .max(32, "Last Name must be at most 32 characters"),
});

export const loginSchema = yup.object().shape({
  email: yup.string().required("Email or Username is required"),
  password: yup.string().required("Password is required"),
});
// create company

export const companyProfileSchema = yup.object().shape({
  companyName: yup.string().trim().required("Company name is required"),
  providerNumber: yup.string().required("Provider number is required"),
  businessEntityId: yup.string().nullable().default(null),
  medicaidIdentifier: yup.string().nullable().default(null),
  evvUsername: yup.string().nullable().default(null),
  medicaidNumber: yup.string().nullable().default(null),
  evvPassword: yup.string().nullable().default(null),
  address1: yup.string().required("Address Line 1 is required"),
  address2: yup.string().nullable().default(null),
  securityPin: yup.string(),
  zip: yup
    .string()
    .required("Zip is required")
    .min(4, "Zip must be at least 4 characters")
    .max(10, "Zip must be at most 10 characters"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  firstName: yup
    .string()
    .required("First Name is required")
    .min(3, "First Name must be at least 3 characters")
    .max(32, "First Name must be at most 32 characters"),
  lastName: yup
    .string()
    .required("Last Name is required")
    .min(3, "Last Name must be at least 3 characters")
    .max(32, "Last Name must be at most 32 characters"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});
export const changePasswordSchema = yup.object().shape({
  oldPassword: yup.string().required("Old password is required"),
  newPassword: yup
    .string()
    .required("New password is required")
    .min(6, "Password must be at least 6 characters long"),
  confirmNewPassword: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("newPassword"), null], "Passwords must match"),
});


export const patientProfileSchema = yup.object().shape({
  firstName: yup.string().required('First Name is required'),
  middleName: yup.string().nullable(),
  lastName: yup.string().required('Last Name is required'),
  dob: yup.date().required('Date of Birth is required').nullable(),
  gender: yup.string().required('Gender is required'),
  ssn: yup.string().required('Social Security Number is required'),
  maritalStatus: yup.string().required('Marital Status is required'),
  mobilePhone: yup.string().required('Mobile Phone is required'),
  alternatePhone: yup.string().nullable(),
  email: yup.string().email('Invalid email').required('Email is required'),
  clinicalManager: yup.string().required('Clinical Manager is required'),
  caseManager: yup.string().required('Case Manager is required'),
  clinician: yup.string().required('Assign to Clinician is required'),
  branch: yup.string().required('Branch is required'),
  patientId: yup.string().required('Patient ID/MRN is required'),
  serviceLocation: yup.string().required('Default Service Location is required'),
  primaryAddress1: yup.string().required('Primary Address Line 1 is required'),
  primaryAddress2: yup.string().nullable(),
  primaryZip: yup.string().required('ZIP Code is required'),
  mailingAddress1: yup.string().nullable(),
  mailingAddress2: yup.string().nullable(),
  mailingZip: yup.string().nullable(),
  visitAddresses: yup.array().of(yup.string()), // Example for multiple visit addresses
  raceEthnicity: yup.array().of(yup.string()), // Example for race/ethnicity selection
  primaryLanguage: yup.string().nullable(),
  additionalLanguages: yup.array().of(yup.string()), // Example for additional languages
  needInterpreter: yup.string().nullable(),
  paymentSources: yup.array().of(yup.string()), // Example for payment sources checkboxes
  admissionSources: yup.object().shape({
    Nursing: yup.boolean().required(),
    Skilled: yup.boolean().required(),
    Hospital: yup.boolean().required(),
    LTCH: yup.boolean().required(),
    IRF: yup.boolean().required(),
    Psychiatric: yup.boolean().required(),
    Other: yup.string().nullable(),
    'N/A': yup.boolean().required(),
  }),
  episodeTiming: yup.string().required('Episode Timing is required'),
  startOfCareDate: yup.date().required('Start of Care Date is required').nullable(),
  episodeStartDate: yup.date().required('Episode Start Date is required').nullable(),
  createEpisodeScheduleVisit: yup.boolean().required(),
  createEpisodeScheduleOASIS: yup.boolean().required(),
  createEpisodeScheduleTherapy: yup.boolean().required(),
  createEpisodeScheduleNonOASIS: yup.boolean().required(),
  createEpisodeScheduleInitialOASIS: yup.boolean().required(),
  createEpisodeScheduleInitialNonOASIS: yup.boolean().required(),
  trackF2FDocumentation: yup.boolean().required(),
});
