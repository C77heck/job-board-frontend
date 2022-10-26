import moment from 'moment';
import * as React from 'react';
import { Form } from "../../../form/form";
import { Input } from '../../../form/inputs/input';
import { emailValidator } from "../../../form/validators/email-validator";
import { requiredValidator } from "../../../form/validators/required-validator";
import { useClient } from "../../../hooks/client.hook";
import { useAuthContext } from '../../../hooks/context-hooks/auth-context.hook';
import { useForm } from '../../../hooks/reducers/form-reducer.hook';
import { Button } from "../../buttons/button";
import { NavLink } from '../libs/nav-link';

export interface LoginFormProps {
    link: string;
    endpoint: string;
    email?: string;
    password?: string;
}

export const LoginForm = (props: LoginFormProps) => {
    const client = useClient();
    const { signin } = useAuthContext();

    const { inputState: { inputs }, inputHandler, isFormValid, getPayload } = useForm({
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

    const submit = async () => {
        if (!isFormValid) {
            return;
        }

        const response: any = await client.client(props.endpoint, 'POST', { body: getPayload(inputs) });

        if (!client.error && !!response) {
            signin({ ...(response?.userData || {}), expiry: moment() });
        }
    };

    return <div>
        <Form
            noSuccessModal={true}
            isFormValid={isFormValid}
            onSubmit={() => submit()}
            submitButton={{ className: 'mt-20 margin-auto w-px-145', title: 'Login', type: 'submit' }}
            buttonWrapper={'col-100'}
            className={'row margin-auto w-60'}
            onSuccess={() => window.location.reload()}
            {...client}
        >
            <Input
                name={'email'}
                label={'Email'}
                validators={[emailValidator]}
                className={'col-100 mt-11'}
                labelClass={'fs-15 fw--700 mb-2'}
                value={inputs.email.value}
                onChange={inputHandler}
            />
            <Input
                name={'password'}
                label={'Password'}
                validators={[requiredValidator]}
                className={'col-100 mt-11'}
                labelClass={'fs-15 fw--700 mb-2'}
                onChange={inputHandler}
                value={inputs.password.value}
            />
        </Form>
        <div className={'position-center py-15'}>
            <NavLink noFullWidth href={props.link}>
                <Button buttonStyle={'link'}>
                    <span className={'hover-opacity color--secondary-1 fs-16'}>Register</span>
                </Button>
            </NavLink>
        </div>
    </div>;
};
