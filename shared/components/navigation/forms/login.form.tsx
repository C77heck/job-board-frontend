import moment from 'moment';
import * as React from "react";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/auth.context";
import { Field } from "../../../form/field";
import { Form } from "../../../form/form";
import { FormStructure } from "../../../form/form.structure";
import { Input } from '../../../form/input';
import { emailValidator } from "../../../form/validators/email-validator";
import { requiredValidator } from "../../../form/validators/required-validator";
import { useClient } from "../../../hooks/client";
import { Button } from "../../buttons/button";

export interface LoginFormProps {
    endpoint: string;
    onClick: () => void;
}

export const LoginForm = (props: LoginFormProps) => {
    const client = useClient();
    const { signin } = useContext(AuthContext);

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

    const submit = async (body: any) => {
        const response: any = await client.client(props.endpoint, 'POST', { body });

        if (!client.error && !!response) {
            signin({ ...(response?.userData || {}), expiry: moment() });
        }
    };

    return <div>
        <Form
            noSuccessModal={true}
            form={form}
            onSubmit={(payload: any) => submit(payload)}
            submitButton={{ className: 'mt-20 margin-auto w-px-145', title: 'Login', type: 'submit' }}
            buttonWrapper={'col-100'}
            className={'row margin-auto w-60'}
            onSuccess={() => window.location.reload()}
            {...client}
        >
            <Input {...form?.fields?.email} namespace={form.namespace}/>
            <Input {...form?.fields?.password} namespace={form.namespace}/>
        </Form>
        <div className={'position-center py-15'}>
            <Button title={'Register'} buttonStyle={'link'} onClick={props.onClick}/>
        </div>
    </div>;
};
