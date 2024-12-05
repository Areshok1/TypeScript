import { BaseProduct } from './BaseProduct';

export type Electronics = BaseProduct & {
  category: 'electronics';
  brand: string;
  warrantyPeriod: number; 
  powerConsumption: string; 
};
