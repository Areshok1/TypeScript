"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const productUtils_1 = require("./utils/productUtils");
const cartUtils_1 = require("./utils/cartUtils");
const electronicsData_1 = require("./data/electronicsData");
const phone = (0, productUtils_1.findProduct)(electronicsData_1.electronics, 1);
console.log("Знайдений товар:", phone);
const affordableElectronics = (0, productUtils_1.filterByPrice)(electronicsData_1.electronics, 15000);
console.log("Доступні товари до 15000:", affordableElectronics);
let cart = [];
if (phone)
    cart = (0, cartUtils_1.addToCart)(cart, phone, 2);
const total = (0, cartUtils_1.calculateTotal)(cart);
console.log("Кошик:", cart);
console.log("Загальна вартість:", total);
