import * as yup from 'yup';

export const SignUpValidationSchema = yup.object().shape({
  username: yup
    .string()
    .trim()
    .min(3, ({ min }) => `Username must be ${min} characters or more.`)
    .max(16, ({ max }) => `Username must be ${max} characters or less.`)
    .required('Username is required.'),
  email: yup
    .string()
    .trim()
    .email('Please enter valid email.')
    .required('Email address is required.'),
  password: yup
    .string()
    .required('Password is required.')
    .min(6, ({ min }) => `Password must be at least ${min} characters.`),
  confirmPassword: yup
    .string()
    .required('Passwords must match.')
    .oneOf([yup.ref('password'), null], 'Passwords must match.'),
  termsOfService: yup
    .string()
    .required('Please agree to the Terms & Conditions to proceed.')
    .oneOf(['true'], 'Please agree to the Terms & Conditions to proceed.'),
});