import * as yup from 'yup';

export const SignInValidationSchema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .email('Please enter valid email.')
    .required('Email address is required.'),
  password: yup
    .string()
    .min(6, ({ min }) => `Password must be at least ${min} characters.`)
    .required('Password is required.'),
});