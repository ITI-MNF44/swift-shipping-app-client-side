import { Department } from '../Enum/Department';

export interface IRolePermissions {
  roleName: string;
  departmentId: Department;
  view: boolean;
  edit: boolean;
  delete: boolean;
  add: boolean;
}
