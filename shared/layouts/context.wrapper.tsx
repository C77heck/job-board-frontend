import { FormContext } from '../contexts/form.context';
import { useForm } from '../hooks/form-hook';

export const ContextWrapper = (props: any) => {
    const { getData, getForm, validate, isFormValid, namespaces, formData } = useForm();
    return <FormContext.Provider value={{ getData, getForm, validate, isFormValid, formData, namespaces: namespaces as any }}>
        {props.children}
    </FormContext.Provider>;
};
