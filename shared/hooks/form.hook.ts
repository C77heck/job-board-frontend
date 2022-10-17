import { useEffect, useState } from 'react';
import { CONSTANTS } from '../constants';
import { FormOptions } from '../form/form.structure';

export interface ValueProp {
    value: any;
    isValid: boolean;
}

export const useForm = () => {
    const { INPUTS: { CHECKBOX } } = CONSTANTS;
    const [formData, setFormData] = useState<any>({});

    const setData = (propName: string, data: ValueProp, namespace: string) => {
        setFormData({
            ...formData,
            [namespace]: { ...formData[namespace], [propName]: data },
        });
    };

    useEffect(() => {
        for (const prop in formData) {
            if (formData.hasOwnProperty(prop)) {
                formData[prop].isFormValid = getIsFormValid(prop);
            }
        }
    }, [formData]);

    const setForm = (form: FormOptions, namespace: string) => {
        const baseForm: any = {};
        for (const prop in form) {
            if (form.hasOwnProperty(prop)) {
                // const isValid = form?.[prop]?.element === CHECKBOX;
                const value = form?.[prop]?.element === CHECKBOX ? !!form?.[prop]?.value : form[prop]?.value;
                baseForm[namespace] = {
                    ...baseForm[namespace],
                    [prop]: { value, isValid: true }
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
            if (form.hasOwnProperty(prop) && prop !== 'isFormValid') {
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
