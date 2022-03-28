import { createContext } from 'react';
import { ValueProp } from '../hooks/form-hook';

export const FormContext = createContext({
    getData: (propName: string, data: ValueProp, namespace: string) => {
    },
    getForm: (namespace: string) => {
    },
    getIsFormValid: (namespace: string) => {
    },
    getPayload: (namespace: string) => {
    },
    formData: (namespace: string) => {
    }
});
