import { FormContext } from '../contexts/form.context';
import { useForm } from '../hooks/form-hook';

export const ContextWrapper = (props: any) => {
    const form = useForm();

    return <FormContext.Provider value={form}>
        {props.children}
    </FormContext.Provider>;
};
