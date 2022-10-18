import { Fragment, useEffect, useState } from 'react';
import { Button, ButtonProps } from '../components/buttons/button';
import { ClientProps } from '../hooks/client.hook';
import { ErrorModal } from './error-modal';
import { FormStructure } from './form.structure';
import { SuccessModal } from './success.modal';

interface FormProps extends ClientProps {
    onSubmit: () => Promise<void>;
    submitButton?: ButtonProps;
    className?: string;
    onSuccess?: () => void;
    onError?: () => void;
    children: any;
    form: FormStructure;
    isFormValid: boolean;
    noSuccessModal?: boolean;
    noErrorModal?: boolean;
    buttonWrapper?: string;
}

export const Form = (props: FormProps) => {
    const [requestReceived, setRequestReceived] = useState(false);
    const { isLoading, error, clearError, successMessage, clearMessage } = props;

    const submit = async (e: any) => {
        e.preventDefault();
        await props.onSubmit();
        setRequestReceived(true);
    };

    useEffect(() => {
        if (requestReceived && (props.noSuccessModal && props.onSuccess) && !error) {
            setRequestReceived(false);
            props.onSuccess();
        }
    }, [requestReceived]);

    const manageSuccessClose = () => {
        if (props.onSuccess) props.onSuccess();

        clearMessage();
    };

    const manageErrorClose = () => {
        if (props.onError) props.onError();

        clearError();
    };

    return <Fragment>
        <form
            onSubmit={(e) => submit(e)}
            className={props.className}
        >
            {props.children}
            {props.submitButton && <div className={`${props.buttonWrapper}`}><Button
                isLoading={isLoading}
                disabled={!props.isFormValid}
                type={'submit'}
                className={`${props.submitButton?.className || ''}`}
                {...props.submitButton}
            /></div>}
        </form>
        <ErrorModal
            show={!!error && !props.noErrorModal}
            errorMessage={error}
            onClick={manageErrorClose}
        />
        <SuccessModal
            show={!!successMessage && !props.noSuccessModal}
            successMessage={successMessage}
            onClick={manageSuccessClose}
        />
    </Fragment>;
};
