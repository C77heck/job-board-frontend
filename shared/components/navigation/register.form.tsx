import moment from "moment";
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

export const RegisterForm = (props: any) => {
    const client = useClient();
    const { signin } = useContext(AuthContext);

    const form = new FormStructure({
        name: new Field({
            name: 'name',
            label: 'Name',
            value: null,
            validators: [requiredValidator],
            className: 'col-100 mt-17',
            labelClass: 'fs-18 fw--700 mb-2',
        }),
        email: new Field({
            name: 'email',
            label: 'Email',
            value: null,
            validators: [emailValidator],
            options: props.options || [],
            className: 'col-100 mt-17',
            labelClass: 'fs-18 fw--700 mb-2',
            placeholder: 'example@example.com',
        }),
        password: new Field({
            name: 'password',
            label: 'Password',
            value: null,
            validators: [requiredValidator],
            className: 'col-100 mt-17',
            labelClass: 'fs-18 fw--700 mb-2',
            type: 'password',
        }),
        hint: new Field({
            name: 'hint',
            label: 'Security hint',
            value: null,
            validators: [requiredValidator],
            className: 'col-100 mt-17',
            labelClass: 'fs-18 fw--700 mb-2',
            placeholder: 'First pet name, first love...',
        }),
        answer: new Field({
            name: 'answer',
            label: 'Answer',
            value: null,
            validators: [requiredValidator],
            className: 'col-100 mt-17',
            labelClass: 'fs-18 fw--700 mb-2',
        }),
    }, 'user-register');

    const submit = async (data: any) => {
        console.log('registering', data);
    };

    return <div>
        <Form
            form={form}
            className={'row margin-auto w-60'}
            onSubmit={(payload: any) => submit(payload)}
            submitButton={{ className: 'mt-20 col-100 col-md-40 col-lg-22 margin-auto', title: 'Register', type: 'submit' }}
            {...client}
        >
            <Input {...form?.fields?.name} namespace={form.namespace}/>
            <Input {...form?.fields?.email} namespace={form.namespace}/>
            <Input {...form?.fields?.password} namespace={form.namespace}/>
            <Input {...form?.fields?.hint} namespace={form.namespace}/>
            <Input {...form?.fields?.answer} namespace={form.namespace}/>
        </Form>
        <div className={'position-center py-15'}>
            <Button title={'login'} buttonStyle={'link'} onClick={props.onClick}/>
        </div>
    </div>;
};
