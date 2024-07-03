import { OrderType } from '../Enum/OrderType';
import { ShippingType } from '../Enum/ShippingType';

export interface IOrderCostDTO {
  weight: number;
  orderType: OrderType;
  shippingType: ShippingType;
  isShippedToVillage: boolean;
  regionId: number;
}
