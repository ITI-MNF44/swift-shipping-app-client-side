export interface IDeliveryManDTO {
  id: number;
  name: string;
  address: string;
  email: string;
  userName: string;
  password: string;
  phoneNumber: string;
  branchId: number;
  // regionId: number;
  regionIds:number[];
}
