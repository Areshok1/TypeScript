export type Validator<T> = {
    validate: (data: T) => ValidationResult;
};

export type ValidationResult = {
    isValid: boolean;
    errors?: string[];
};

