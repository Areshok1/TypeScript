import { Product } from '../interfaces/Product';
import { Validator } from './Validator';

export const productValidator: Validator<Product> = {
    validate: (data) => {
        const errors: string[] = [];

        if (!data.name || data.name.trim() === '') {
            errors.push('Product name is required.');
        }
        if (data.name && data.name.length > 50) {
            errors.push('Product name must not exceed 50 characters.');
        }
        if (data.price < 0) {
            errors.push('Price must be a non-negative value.');
        }
        if (data.stock < 0) {
            errors.push('Stock must be a non-negative value.');
        }

        return {
            isValid: errors.length === 0,
            errors,
        };
    },
};
