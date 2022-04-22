import { Fragment, useContext, useEffect, useState } from 'react';
import { debounceTime, distinctUntilChanged, Subject, tap } from 'rxjs';
import { Button, ButtonProps } from '../components/buttons/button';
import { FormContext } from '../contexts/form.context';
import { FormStructure } from './form.structure';
import { SuccessModal } from './success.modal';
import { ClientProps } from '../hooks/client';
import { ErrorModal } from './error-modal';

interface FormProps extends ClientProps {
    onSubmit: (payload: any) => void;
    submitButton?: ButtonProps;
    className?: string;
    onSuccess?: () => void;
    onError?: () => void;
    children: any;
    form: FormStructure;
}

export const Form = (props: FormProps) => {
    const [isFormValid, setIsFormValid] = useState(false);
    const { formData, getPayload, setForm } = useContext(FormContext);
    const namespace = props.form?.namespace;
    const fields = props.form?.fields;

    const checkValidity = (form: any) => {
        console.log('CHECKING THE VALIDITY', { form: form.isFormValid });
        setIsFormValid(form.isFormValid);
    };
    const [$onFormValidity] = useState(() => new Subject());
    useEffect(() => {
        const subscription = $onFormValidity.pipe(
            debounceTime(500),
            distinctUntilChanged(),
            tap(a => console.log(a))
        ).subscribe(checkValidity as any);

        return () => subscription.unsubscribe();
    }, []);

    useEffect(() => {
        $onFormValidity.next(formData);
    }, [formData]);

    // useEffect(() => {
    //     setIsFormValid(!(formData as any)?.[namespace]?.isFormValid);
    // }, [formData]);

    useEffect(() => {
        setForm(fields, namespace);
    }, [fields, namespace]);

    const { isLoading, error, clearError, successMessage, clearMessage } = props;

    const submit = async (e: any) => {
        e.preventDefault();
        props.onSubmit(getPayload(namespace));
    };
    // review this logic
    const manageSuccessClose = () => {
        if (props.onSuccess) {
            props.onSuccess();
        }

        clearMessage();
    };

    const manageErrorClose = () => {
        if (props.onError) {
            props.onError();
        }

        clearError();
    };

    return <Fragment>
        <form
            onSubmit={(e) => submit(e)}
            className={props.className}
        >
            {props.children}
            {props.submitButton && <Button
                isLoading={isLoading}
                disabled={isFormValid}
                type={'submit'}
                {...props.submitButton}
            />}
        </form>
        <ErrorModal
            show={!!error}
            errorMessage={error}
            onClick={manageErrorClose}
        />
        <SuccessModal
            show={!!successMessage}
            successMessage={successMessage}
            onClick={manageSuccessClose}
        />
    </Fragment>;
};
