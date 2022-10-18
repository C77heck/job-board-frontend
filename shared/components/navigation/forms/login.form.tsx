import moment from 'moment';
import * as React from 'react';
import { useEffect } from 'react';
import { Field } from "../../../form/field";
import { Form } from "../../../form/form";
import { FormStructure } from "../../../form/form.structure";
import { ReducerInput } from '../../../form/reducer-input';
import { emailValidator } from "../../../form/validators/email-validator";
import { requiredValidator } from "../../../form/validators/required-validator";
import { useClient } from "../../../hooks/client.hook";
import { useAuthContext } from '../../../hooks/context-hooks/auth-context.hook';
import { useFormReducer } from '../../../hooks/form-reducer.hook';
import { Button } from "../../buttons/button";

export interface LoginFormProps {
    endpoint: string;
    onClick: () => void;
}

export const LoginForm = (props: LoginFormProps) => {
    const client = useClient();
    const { signin } = useAuthContext();
    const { inputState: { inputs }, inputHandler, isFormValid, destroy } = useFormReducer({
        inputs: {
            email: {
                value: '',
                valid: false
            },
            password: {
                value: '',
                valid: false
            }
        },
        isFormValid: false
    });
    const form = new FormStructure({
        email: new Field({
            name: 'email',
            label: 'Email',
            value: null,
            validators: [emailValidator],
            className: 'col-100 mt-11',
            labelClass: 'fs-15 fw--700 mb-2',
        }),
        password: new Field({
            name: 'password',
            label: 'Password',
            value: null,
            validators: [requiredValidator],
            className: 'col-100 mt-11',
            labelClass: 'fs-15 fw--700 mb-2',
            type: 'password',
        }),
    }, 'login-form');

    useEffect(() => {
        console.log({ inputs, isFormValid });
    }, [inputs]);
    const submit = async () => {
        if (!isFormValid) {
            return;
        }

        const response: any = await client.client(props.endpoint, 'POST', { body: inputs });

        if (!client.error && !!response) {
            signin({ ...(response?.userData || {}), expiry: moment() });
            destroy();
        }
    };

    return <div>
        <Form
            noSuccessModal={true}
            isFormValid={isFormValid}
            form={form}
            onSubmit={() => submit()}
            submitButton={{ className: 'mt-20 margin-auto w-px-145', title: 'Login', type: 'submit' }}
            buttonWrapper={'col-100'}
            className={'row margin-auto w-60'}
            onSuccess={() => window.location.reload()}
            {...client}
        >
            <ReducerInput
                {...form?.fields?.email}
                value={inputs.email.value}
                onChange={inputHandler}
            />
            <ReducerInput
                {...form?.fields?.password}
                onChange={inputHandler}
                value={inputs.password.value}
            />
        </Form>
        <div className={'position-center py-15'}>
            <Button buttonStyle={'link'} onClick={props.onClick}>
                <span className={'hover-opacity color--secondary-1 fs-16'}>Register</span>
            </Button>
        </div>
    </div>;
};
