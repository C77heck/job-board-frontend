import { ValidatorInterface } from './validator-interface';

export const onlyNumberValidator = (value: any): ValidatorInterface => {
    if (!value) {
        return { hasError: true, errorMessage: 'Required' };
    }

    const hasOnlyNumbers = /^[0-9]*$/;

    return { hasError: !hasOnlyNumbers.test(value), errorMessage: '' };
};
