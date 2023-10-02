import * as yup from 'yup';

export const orderItemValidationSchema = yup.object().shape({
  quantity: yup.number().integer().nullable(),
  price: yup.number().integer().nullable(),
  gst_amount: yup.number().integer().nullable(),
  net_amount: yup.number().integer().nullable(),
  order_id: yup.string().nullable().required(),
  menu_id: yup.string().nullable().required(),
});
