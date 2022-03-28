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

    const getIsFormValid = (namespace: string) => {
        const form = formData?.[namespace] || {};

        for (const prop in form) {
            if (form.hasOwnProperty(prop)) {
                if (!form[prop]?.isValid) {
                    return false;
                }
            }
        }

        return true;
    };

    const getPayload = (namespace: string) => {
        const form = formData?.[namespace] || {};
        const payload: any = {};
        for (const prop in form) {
            if (form.hasOwnProperty(prop)) {
                payload[prop] = form[prop]?.value;
            }
        }

        return payload;
    };

    return { getData, getForm, getIsFormValid, formData, getPayload };
};
