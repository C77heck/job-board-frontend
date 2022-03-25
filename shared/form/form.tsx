import { Fragment, useEffect, useState } from 'react';
import { Button, ButtonProps } from '../components/buttons/button';
import { SuccessModal } from './success.modal';
import { ClientProps } from '../hooks/client';
import { ErrorModal } from './error-modal';
import Input from './input';

interface FormProps extends ClientProps {
    onSubmit: () => void;
    submitButton?: ButtonProps;
    className?: string;
    onSuccess?: () => void;
    onError?: () => void;
    children: any;
}

export const Form = (props: FormProps) => {
    const { isLoading, error, clearError, successMessage, clearMessage } = props;
    // TODO -> we will need the context data to come here with form validity and such
    const isFormValid = true;
    // perhaps get the form data here and submit it too. see how it goes
    const submit = async (e: any) => {
        e.preventDefault();
        props.onSubmit();
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
            <div className={'row'}>
                {props.submitButton && <Button
                    isLoading={isLoading}
                    disabled={!isFormValid}
                    {...props.submitButton}
                />}
            </div>
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
