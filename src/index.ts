import { findProduct, filterByPrice } from './utils/productUtils';
import { addToCart, calculateTotal, CartItem } from './utils/cartUtils';
import { electronics } from './data/electronicsData';
import { clothing } from './data/clothingData';
import { BaseProduct } from './types/BaseProduct';

const phone = findProduct(electronics, 1);
console.log("Знайдений товар:", phone);

const affordableElectronics = filterByPrice(electronics, 15000);
console.log("Доступні товари до 15000:", affordableElectronics);

let cart: CartItem<BaseProduct>[] = [];
if (phone) cart = addToCart(cart, phone, 2);
const total = calculateTotal(cart);

console.log("Кошик:", cart);
console.log("Загальна вартість:", total);
