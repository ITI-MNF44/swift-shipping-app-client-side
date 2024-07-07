export interface ISellerGetDTO {
  id: number;
  branchName: string;
  regionName: string;
  storeName: string;
  name: string;
  address: string;
  email: string;
  userName: string;
  password: string;
  phoneNumber: string;
  isDeleted?: boolean;
}
