import { Department } from '../Enum/Department';

export interface IPermissionDTO {
  departmentId: Department;
  departmentName: string;
  view: boolean;
  edit: boolean;
  delete: boolean;
  add: boolean;
}
