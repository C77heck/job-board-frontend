import { useState } from 'react';

export interface ValueProp {
    value: string;
    isValid: boolean;
}

export const useForm = () => {
    const [namespaces, setNamespaces] = useState<any[]>([]);
    const [formData, setFormData] = useState<any>({});

    const getData = (data: ValueProp, namespace: string) => {
        setNamespaces([...namespaces, namespace]);
        setFormData({
            ...formData,
            [namespace]: data,
        });
    };

    const getForm = (namespace: string) => {
        return formData?.[namespace] || {};
    };

    const validate = (namespace: string) => {
        console.log(formData?.[namespace] || {});
    };

    const isFormValid = (namespace: string) => {
        return true;
    };

    return { getData, getForm, validate, isFormValid, namespaces, formData };
};
