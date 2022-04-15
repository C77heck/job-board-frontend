import { useEffect, useState } from 'react';
import { CONSTANTS } from '../constants';
import { FormOptions, FormStructure } from '../form/form.structure';

export interface ValueProp {
    value: string;
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

    const setForm = (form: FormOptions, namespace: string) => {
        const baseForm: any = {};
        console.log('CHEKC THIS', { form });
        for (const prop in form) {
            if (form.hasOwnProperty(prop)) {
                const isValid = form?.[prop]?.element === CHECKBOX;
                baseForm[namespace] = {
                    ...baseForm[namespace],
                    [prop]: { value: form?.[prop]?.value || '', isValid }
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
        console.log({ namespace, form });
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
