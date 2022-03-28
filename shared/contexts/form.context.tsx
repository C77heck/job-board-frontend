import { createContext } from 'react';
import { UserProps } from '../hooks/auth-hook';
import { ValueProp } from '../hooks/form-hook';

export const FormContext = createContext({
    namespaces: [],
    getData: (data: ValueProp, namespace: string) => {
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
