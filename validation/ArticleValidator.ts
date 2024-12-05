import { Article } from '../interfaces/Article';
import { Validator } from './Validator';

export const articleValidator: Validator<Article> = {
    validate: (data) => {
        const errors: string[] = [];

        if (!data.title || data.title.trim() === '') {
            errors.push('Title is required.');
        }
        if (data.title && data.title.length > 100) {
            errors.push('Title must not exceed 100 characters.');
        }
        if (!data.content || data.content.trim() === '') {
            errors.push('Content is required.');
        }

        return {
            isValid: errors.length === 0,
            errors,
        };
    },
};
