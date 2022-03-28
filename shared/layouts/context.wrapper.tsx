import { FormContext } from '../contexts/form.context';
import { useForm } from '../hooks/form-hook';

export const ContextWrapper = (props: any) => {
    const { getData, getForm, getIsFormValid, formData, getPayload } = useForm();
    return <FormContext.Provider value={{ getData, getForm, getIsFormValid, formData, getPayload }}>
        {props.children}
    </FormContext.Provider>;
};
