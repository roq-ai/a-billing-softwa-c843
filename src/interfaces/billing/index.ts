import { OrderInterface } from 'interfaces/order';
import { GetQueryInterface } from 'interfaces';

export interface BillingInterface {
  id?: string;
  billing_number: string;
  total_amount?: number;
  gst_amount?: number;
  net_amount?: number;
  payment_method?: string;
  order_id: string;
  created_at?: any;
  updated_at?: any;

  order?: OrderInterface;
  _count?: {};
}

export interface BillingGetQueryInterface extends GetQueryInterface {
  id?: string;
  billing_number?: string;
  payment_method?: string;
  order_id?: string;
}
