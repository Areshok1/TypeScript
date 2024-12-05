import { BaseProduct } from './BaseProduct';

export type Clothing = BaseProduct & {
  category: 'clothing';
  size: string;
  material: string;
  gender: 'male' | 'female' | 'unisex';
};
