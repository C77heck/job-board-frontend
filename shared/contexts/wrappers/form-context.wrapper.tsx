import { AuthContext } from '../auth.context';
import { FormContext } from '../form.context';
import { useAuth } from '../../hooks/auth-hook';
import { useForm } from '../../hooks/form-hook';

export const FormContextWrapper = (props: any) => {
    const form = useForm();

    return <FormContext.Provider value={form}>
        {props.children}
    </FormContext.Provider>;
};
