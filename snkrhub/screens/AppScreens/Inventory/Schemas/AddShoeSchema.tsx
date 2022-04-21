import dayjs from 'dayjs';
import * as yup from 'yup';

export const AddShoeSchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .required('Name is required'),
  styleId: yup
    .string()
    .trim(),
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
    .transform(value => {
      return value ? dayjs(value).format('YYYY-MM-DD') : value;
    })
    .required('Purchase date is required')
    .typeError('Purchase date must be YYYY-MM-DD'),
  orderNumber: yup
    .string()
    .trim(),
});