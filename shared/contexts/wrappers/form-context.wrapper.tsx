import { FormContext } from '../form.context';
import { useForm } from '../../hooks/form.hook';

export const FormContextWrapper = (props: any) => {
    const form = useForm();

    return <FormContext.Provider value={form}>
        {props.children}
    </FormContext.Provider>;
};
