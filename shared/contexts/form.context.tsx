import { createContext } from 'react';
import { ValueProp } from '../hooks/form-hook';

export const FormContext = createContext({
    getData: (propName: string, data: ValueProp, namespace: string) => {
    },
    getForm: (namespace: string) => {
    },
    validate: (namespace: string) => {
    },
    isFormValid: (namespace: string) => {
    },
    formData: (namespace: string) => {
    }
});
