import { createContext } from 'react';
import { FormOptions, FormStructure } from '../form/form.structure';
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
    formData: {},
    setForm: (form: FormOptions, namespace: string) => {
    },
});
