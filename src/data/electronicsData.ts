import { Electronics } from '../types/Electronics';

export const electronics: Electronics[] = [
  {
    id: 1,
    name: "Телефон",
    price: 10000,
    description: "Смартфон з великим екраном і потужною батареєю",
    stock: 50,
    category: 'electronics',
    brand: "Samsung",
    warrantyPeriod: 24,
    powerConsumption: "15W"
  },
  {
    id: 2,
    name: "Ноутбук",
    price: 20000,
    description: "Потужний ноутбук для роботи та навчання",
    stock: 30,
    category: 'electronics',
    brand: "Dell",
    warrantyPeriod: 36,
    powerConsumption: "45W"
  }
];
