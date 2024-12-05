"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateTotal = exports.addToCart = void 0;
const addToCart = (cart, product, quantity) => {
    const existingItem = cart.find(item => item.product.id === product.id);
    if (existingItem) {
        existingItem.quantity += quantity;
    }
    else {
        cart.push({ product, quantity });
    }
    return cart;
};
exports.addToCart = addToCart;
const calculateTotal = (cart) => {
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
};
exports.calculateTotal = calculateTotal;
