import { IRegionGetDTO } from './IRegionGetDTO';

export interface IGovernmentWithRegionsDTO {
  id: number;
  name: string;
  regions: IRegionGetDTO[];
}