import { OrderType } from '../Enum/OrderType';
import { PaymentType } from '../Enum/PaymentType';
import { ShippingType } from '../Enum/ShippingType';

export interface IOrderDTO {
  customerName: string;
  customerPhone: string;
  address: string;
  branchId: number;
  regionId: number;
  isShippedToVillage: boolean;
  villageName?: string;
  weight: number;
  orderPrice: number;
  note?: string;
  sellerId: number;
  shippingType: ShippingType;
  orderType: OrderType;
  paymentType: PaymentType;
}
