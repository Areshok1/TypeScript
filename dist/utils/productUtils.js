"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterByPrice = exports.findProduct = void 0;
const findProduct = (products, id) => {
    return products.find(product => product.id === id);
};
exports.findProduct = findProduct;
const filterByPrice = (products, maxPrice) => {
    return products.filter(product => product.price <= maxPrice);
};
exports.filterByPrice = filterByPrice;
