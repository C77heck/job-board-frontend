import * as Process from 'process';
import * as React from "react";
import { useContext } from "react";
import { CONSTANTS } from '../../constants';
import { Input } from '../../form/input';
import { Button } from "../buttons/button";
import { AuthContext } from "../../contexts/auth.context";
import { Field } from "../../form/field";
import { Form } from "../../form/form";
import { FormStructure } from "../../form/form.structure";
import { emailValidator } from "../../form/validators/email-validator";
import { requiredValidator } from "../../form/validators/required-validator";
import { useClient } from "../../hooks/client";

// TODO -> these will have to be dealt with. probably with an attachment service.
// we could build a local service that serves staff from the local machine.
//     logo?: string,
//     meta?: string[],
//     images?: string[];

export const RegisterForm = (props: any) => {
    const { INPUTS: { CHECKBOX } } = CONSTANTS;
    const client = useClient();
    const { signin } = useContext(AuthContext);
    const form = new FormStructure({
        name: new Field({
            name: 'name',
            label: 'Name',
            value: null,
            validators: [requiredValidator],
            className: 'col-100 mt-11',
            labelClass: 'fs-15 fw--700 mb-2',
        }),
        email: new Field({
            name: 'email',
            label: 'Email',
            value: null,
            validators: [emailValidator],
            className: 'col-100 mt-11',
            labelClass: 'fs-15 fw--700 mb-2',
            placeholder: 'example@example.com',
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
        securityQuestion: new Field({
            name: 'securityQuestion',
            label: 'Security hint',
            value: null,
            validators: [requiredValidator],
            className: 'col-100 mt-11',
            labelClass: 'fs-15 fw--700 mb-2',
            placeholder: 'First pet name, first love...',
        }),
        securityAnswer: new Field({
            name: 'securityAnswer',
            label: 'Answer',
            value: null,
            validators: [requiredValidator],
            className: 'col-100 mt-11',
            labelClass: 'fs-15 fw--700 mb-2',
        }),
        isRecruiter: new Field({
            name: 'isRecruiter',
            label: 'Are you a recruiter?',
            value: false,
            validators: [],
            className: 'col-100 mt-11',
            labelClass: 'fs-15 fw--700 mb-2',
        }),
        description: new Field({
            name: 'description',
            label: 'Description',
            value: null,
            validators: [],
            className: 'col-100 mt-11',
            labelClass: 'fs-15 fw--700 mb-2',
        }),
    }, 'user-register');
    // const apiURL = process.env?.NEXT_PUBLIC_API || '';
    // PROCESS is not defines. check on next js.

    const submit = async (data: any) => {
        const response = await client.client(`${process?.env?.NEXT_PUBLIC_API || ''}/users/signup`, 'POST', { body: data });
        console.log('registering', data, response);
    };

    return <div>
        <Form
            form={form}
            className={'row justify-content-space-between'}
            onSubmit={(payload: any) => submit(payload)}
            submitButton={{ className: 'mt-20 col-100 col-md-40 col-lg-22 margin-auto', title: 'Register', type: 'submit' }}
            {...client}
        >
            <div className={'col-md-50 mx-md-20 col-100'}>
                <Input {...form?.fields?.name} namespace={form.namespace}/>
                <Input {...form?.fields?.email} namespace={form.namespace}/>
                <Input {...form?.fields?.password} namespace={form.namespace}/>
                <Input {...form?.fields?.isRecruiter} element={CHECKBOX} namespace={form.namespace}/>
            </div>
            <div className={'col-md-50 mx-md-20 col-100'}>
                <Input {...form?.fields?.securityQuestion} namespace={form.namespace}/>
                <Input {...form?.fields?.securityAnswer} namespace={form.namespace}/>
                <Input {...form?.fields?.description} namespace={form.namespace}/>
            </div>
        </Form>
        <div className={'position-center py-15'}>
            <Button title={'login'} buttonStyle={'link'} onClick={props.onClick}/>
        </div>
    </div>;
};
