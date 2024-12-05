import { Validator, ValidationResult } from './Validator';

export class CompositeValidator<T> implements Validator<T> {
    private validators: Validator<T>[] = [];

    addValidator(validator: Validator<T>): void {
        this.validators.push(validator);
    }

    validate(data: T): ValidationResult {
        const errors: string[] = [];

        for (const validator of this.validators) {
            const result = validator.validate(data);
            if (!result.isValid && result.errors) {
                errors.push(...result.errors);
            }
        }

        return {
            isValid: errors.length === 0,
            errors: errors.length > 0 ? errors : undefined,
        };
    }
}
