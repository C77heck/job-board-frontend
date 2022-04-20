import { Fragment, useContext, useEffect, useState } from 'react';
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
    const { formData, getPayload, setForm } = useContext(FormContext);
    const namespace = props.form?.namespace;
    const fields = props.form?.fields;

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
                disabled={!(formData as any)?.[namespace]?.isFormValid}
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
