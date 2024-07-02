import { OrderType } from "./OrderType";
import { PaymentType } from "./PaymentType";
import { ShippingType } from "./ShippingType";

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
  note: string;
  sellerId: number;
  shippingType: ShippingType;
  orderType: OrderType;
  paymentType: PaymentType;
}
