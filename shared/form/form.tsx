import { Fragment, useContext, useEffect, useState } from 'react';
import { debounceTime, distinctUntilChanged, Subject, tap } from 'rxjs';
import { Button, ButtonProps } from '../components/buttons/button';
import { FormContext } from '../contexts/form.context';
import { ClientProps } from '../hooks/client';
import { ErrorModal } from './error-modal';
import { FormStructure } from './form.structure';
import { SuccessModal } from './success.modal';

interface FormProps extends ClientProps {
    onSubmit: (payload: any) => void;
    submitButton?: ButtonProps;
    className?: string;
    onSuccess?: () => void;
    onError?: () => void;
    children: any;
    form: FormStructure;
    noModals?: boolean;
}

export const Form = (props: FormProps) => {
    const [isFormValid, setIsFormValid] = useState(false);
    const { formData, getPayload, setForm } = useContext(FormContext);
    const namespace = props.form?.namespace;
    const fields = props.form?.fields;
    const { isLoading, error, clearError, successMessage, clearMessage } = props;

    // this bit of code is to bring the context api state data up to speed with the  component.
    const [$onFormValidity] = useState(() => new Subject());
    const checkValidity = (form: any) => {
        setIsFormValid(!form?.[namespace].isFormValid);
    };

    useEffect(() => {
        const subscription = $onFormValidity.pipe(
            debounceTime(500),
            distinctUntilChanged(),
            tap(a => console.log('DONT MIND'))
        ).subscribe(checkValidity as any);

        return () => subscription.unsubscribe();
    }, []);

    useEffect(() => {
        $onFormValidity.next(formData);
    }, [formData]);

    useEffect(() => {
        setForm(fields, namespace);
    }, []);

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
            show={!!error && !props.noModals}
            errorMessage={error}
            onClick={manageErrorClose}
        />
        <SuccessModal
            show={!!successMessage && !props.noModals}
            successMessage={successMessage}
            onClick={manageSuccessClose}
        />
    </Fragment>;
};
