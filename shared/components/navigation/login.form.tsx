import moment from 'moment';
import * as React from "react";
import { useContext } from "react";
import { Input } from '../../form/input';
import { Button } from "../buttons/button";
import { AuthContext } from "../../contexts/auth.context";
import { Field } from "../../form/field";
import { Form } from "../../form/form";
import { FormStructure } from "../../form/form.structure";
import { emailValidator } from "../../form/validators/email-validator";
import { requiredValidator } from "../../form/validators/required-validator";
import { useClient } from "../../hooks/client";

export const LoginForm = (props: any) => {
    const client = useClient();
    const { signin } = useContext(AuthContext);

    const form = new FormStructure({
        email: new Field({
            name: 'email',
            label: 'Email',
            value: null,
            validators: [emailValidator],
            options: props.options || [],
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

    const submit = async (data: any) => {
        const body: any = {
            email: "something@gmail.com" || data?.email || '',
            password: "something@gmail.com" || data?.password || '',
        };
        const response: any = await client.client('/users/login', 'post', { body });

        if (!client.error && !!response) {
            signin({ ...(response?.userData || {}), expiry: moment() });
        }
    };

    return <div>
        <Form
            {...client}
            onSubmit={(data: any) => submit(data)}
            form={form}
            submitButton={{ className: 'mt-20 col-100 col-md-40 col-lg-22 margin-auto', title: 'Login', type: 'submit' }}
            className={'row margin-auto w-60'}
        >
            <Input {...form?.fields?.email} namespace={form.namespace}/>
            <Input {...form?.fields?.password} namespace={form.namespace}/>
        </Form>
        <div className={'position-center py-15'}>
            <Button title={'Register'} buttonStyle={'link'} onClick={props.onClick}/>
        </div>
    </div>;
};
