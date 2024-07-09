export interface IDeliveryManGetDTO {
  id: number;
  name: string;
  address: string;
  email: string;
  userName: string;
  phoneNumber: string;
  branchName: string;
  regionName: string;
  selectedRegions?: number[];
  branchId: number;
}
