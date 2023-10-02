import * as yup from 'yup';

export const orderValidationSchema = yup.object().shape({
  order_number: yup.string().required(),
  total_amount: yup.number().integer().nullable(),
  gst_amount: yup.number().integer().nullable(),
  net_amount: yup.number().integer().nullable(),
  restaurant_id: yup.string().nullable().required(),
  user_id: yup.string().nullable().required(),
});
