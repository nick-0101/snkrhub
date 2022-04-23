import dayjs from 'dayjs';
import * as yup from 'yup';

export const AddShoeSchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .required('Name is required'),
  styleid: yup
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
  shoesize: yup
    .number()
    .required('Shoe size is required'),
  purchaseprice: yup
    .number()
    .transform((value) => (isNaN(value) ? Number(value) : value))
    .min(0, 'Invalid currency')
    .required('Purchase price is required'),
  tax: yup
    .number()
    .transform((value) => (isNaN(value) ? Number(value) : value))
    .min(0, 'Invalid currency'),
  shipping: yup
    .number()
    .transform((value) => (isNaN(value) ? Number(value) : value))
    .min(0, 'Invalid currency'),
  purchasedate: yup
    .string()
    .transform(value => {
      return value ? dayjs(value).format('YYYY-MM-DD') : value;
    })
    .required('Purchase date is required')
    .typeError('Purchase date must be YYYY-MM-DD'),
  ordernumber: yup
    .string()
    .trim(),
});