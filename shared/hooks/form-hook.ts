import { useState } from 'react';

export interface ValueProp {
    value: string;
    isValid: boolean;
}

export const useForm = () => {
    const [formData, setFormData] = useState<any>({});

    const getData = (propName: string, data: ValueProp, namespace: string) => {
        setFormData({
            ...formData,
            [namespace]: { ...formData[namespace], [propName]: data },
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

    return { getData, getForm, validate, isFormValid, formData };
};
