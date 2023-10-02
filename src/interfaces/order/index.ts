import { BillingInterface } from 'interfaces/billing';
import { OrderItemInterface } from 'interfaces/order-item';
import { RestaurantInterface } from 'interfaces/restaurant';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface OrderInterface {
  id?: string;
  order_number: string;
  total_amount?: number;
  gst_amount?: number;
  net_amount?: number;
  restaurant_id: string;
  user_id: string;
  created_at?: any;
  updated_at?: any;
  billing?: BillingInterface[];
  order_item?: OrderItemInterface[];
  restaurant?: RestaurantInterface;
  user?: UserInterface;
  _count?: {
    billing?: number;
    order_item?: number;
  };
}

export interface OrderGetQueryInterface extends GetQueryInterface {
  id?: string;
  order_number?: string;
  restaurant_id?: string;
  user_id?: string;
}
