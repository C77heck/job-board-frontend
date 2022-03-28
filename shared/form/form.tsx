import { Fragment, useEffect, useState } from 'react';
import { Button, ButtonProps } from '../components/buttons/button';
import { FormStructure } from './form.structure';
import { SuccessModal } from './success.modal';
import { ClientProps } from '../hooks/client';
import { ErrorModal } from './error-modal';
import Input from './__input';

interface FormProps extends ClientProps {
    onSubmit: () => void;
    submitButton?: ButtonProps;
    className?: string;
    onSuccess?: () => void;
    onError?: () => void;
    children: any;
    form?: FormStructure;
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
                    type={'submit'}
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

// public validate(): boolean {
//     const fields = this.fields;
//     let validatorResults: boolean[] = [];
//     for (const prop in fields) {
//         if (fields.hasOwnProperty(prop) && !!(fields[prop]?.validators || []).length) {
//             const results = (fields[prop]?.validators || []).map(validator => validator());
//             validatorResults = [...validatorResults, ...results];
//         }
//     }
//
//     return !validatorResults.filter(result => !result).length;
// }
//
// public json() {
//     const fields = this.fields;
//     let payload: any = {};
//     for (const prop in fields) {
//         if (fields.hasOwnProperty(prop)) {
//             console.log(fields[prop]);
//             payload[prop] = fields[prop]?.value || '';
//         }
//     }
//
//     return JSON.stringify(payload);
// }
