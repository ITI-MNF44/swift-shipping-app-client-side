export interface ISellerGetDTO {
  id: number;
  branchName: string;
  branchId: number;
  regionName: string;
  regionId: string;
  storeName: string;
  name: string;
  address: string;
  email: string;
  userName: string;
  password: string;
  phoneNumber: string;
  isDeleted?: boolean;
}
