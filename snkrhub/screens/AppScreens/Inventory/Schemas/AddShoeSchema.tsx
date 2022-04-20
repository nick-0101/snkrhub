import * as yup from 'yup';

export const AddShoeSchema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .required('Name is required'),
  brand: yup
    .string()
    .trim(),
  colour: yup
    .string()
    .trim(),
  condition: yup
    .string()
    .trim(),
  shoeSize: yup
    .number()
    .required('Shoe size is required'),
  purchasePrice: yup
    .number()
    .required('Purchase price is required'),
  tax: yup
    .number(),
  shipping: yup
    .number(),
  purchaseDate: yup
    .string()
    .trim()
    .required('Purchase date is required'),
  orderNumber: yup
    .string()
    .trim(),
});