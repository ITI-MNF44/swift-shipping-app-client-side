import { OrderStatus } from '../Enum/OrderStatus';

export interface IOrderGetDTO {
  id: number;
  customerName: string;
  customerPhone: string;
  address: string;
  region: string;
  government: string;
  isShippedToVillage: boolean;
  villageName?: string;
  weight: number;
  orderPrice: number;
  note?: string;
  shippingType: string;
  orderType: string;
  paymentType: string;    
  status: string;
  orderStatus: OrderStatus;
  creationDate: Date;
  deliveryCost: number;
  //delivery man id
  deliveryId?:number;
}
