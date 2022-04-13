import * as yup from 'yup';

export const ForgotPasswordValidationSchema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .email('Please enter valid email.')
    .required('Email address is required.'),
});