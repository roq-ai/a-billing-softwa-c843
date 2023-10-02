import * as yup from 'yup';

export const billingValidationSchema = yup.object().shape({
  billing_number: yup.string().required(),
  total_amount: yup.number().integer().nullable(),
  gst_amount: yup.number().integer().nullable(),
  net_amount: yup.number().integer().nullable(),
  payment_method: yup.string().nullable(),
  order_id: yup.string().nullable().required(),
});
