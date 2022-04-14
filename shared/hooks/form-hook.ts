import { useEffect, useState } from 'react';
import { FormOptions, FormStructure } from '../form/form.structure';

export interface ValueProp {
    value: string;
    isValid: boolean;
}

export const useForm = () => {
    const [formData, setFormData] = useState<any>({});
    const setData = (propName: string, data: ValueProp, namespace: string) => {
        console.log('triggered getData');

        setFormData({
            ...formData,
            [namespace]: { ...formData[namespace], [propName]: data },
        });
    };

    useEffect(() => {
        console.log('triggered useEffect', { formData });
        for (const namespace in formData) {
            console.log(getIsFormValid(namespace));
        }
    }, [formData]);

    const setForm = (form: FormOptions, namespace: string) => {
        console.log('setForm', namespace);
        const baseForm: any = {};
        console.log({ baseForm, form, namespace });
        for (const prop in form) {
            if (form.hasOwnProperty(prop)) {
                baseForm[namespace] = {
                    ...baseForm[namespace],
                    [prop]: { value: form?.[prop]?.value || '', isValid: false }
                };
            }
        }

        setFormData({
            ...formData,
            ...baseForm
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

    return { setData, getForm, getIsFormValid, formData, getPayload, setForm };
};
