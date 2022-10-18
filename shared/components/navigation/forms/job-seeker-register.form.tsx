import moment from 'moment';
import * as React from "react";
import { Field } from "../../../form/field";
import { Form } from "../../../form/form";
import { FormStructure } from "../../../form/form.structure";
import { Input } from '../../../form/old-input';
import { emailValidator } from "../../../form/validators/email-validator";
import { requiredValidator } from "../../../form/validators/required-validator";
import { useClient } from "../../../hooks/client.hook";
import { useAuthContext } from '../../../hooks/context-hooks/auth-context.hook';
import { Button } from "../../buttons/button";

export const JobSeekerRegisterForm = (props: any) => {
    const client = useClient();
    const { signin } = useAuthContext();
    const form = new FormStructure({
        first_name: new Field({
            name: 'first_name',
            label: 'First name',
            value: '',
            validators: [requiredValidator],
            className: 'col-100 mt-11',
            labelClass: 'fs-15 fw--700 mb-2',
        }),
        last_name: new Field({
            name: 'last_name',
            label: 'Last name',
            value: '',
            validators: [requiredValidator],
            className: 'col-100 mt-11',
            labelClass: 'fs-15 fw--700 mb-2',
        }),
        email: new Field({
            name: 'email',
            label: 'Email',
            value: '',
            validators: [emailValidator],
            className: 'col-100 mt-11',
            labelClass: 'fs-15 fw--700 mb-2',
            placeholder: 'example@example.com',
        }),
        password: new Field({
            name: 'password',
            label: 'Password',
            value: '',
            validators: [requiredValidator],
            className: 'col-100 mt-11',
            labelClass: 'fs-15 fw--700 mb-2',
            type: 'password',
        }),
        securityQuestion: new Field({
            name: 'securityQuestion',
            label: 'Security hint',
            value: '',
            validators: [requiredValidator],
            className: 'col-100 mt-11',
            labelClass: 'fs-15 fw--700 mb-2',
            placeholder: 'First pet name, first love...',
        }),
        securityAnswer: new Field({
            name: 'securityAnswer',
            label: 'Answer',
            value: '',
            validators: [requiredValidator],
            className: 'col-100 mt-11',
            labelClass: 'fs-15 fw--700 mb-2',
        }),
    }, 'user-register');

    const submit = async (data: any) => {
        const response: any = await client.client(props.endpoint, 'POST', { body: data });

        if (!client.error && !!response) {
            signin({ ...(response?.userData || {}), expiry: moment() });
        }
    };

    return <div>
        <Form
            form={form}
            className={'row justify-content-space-between'}
            onSubmit={(payload: any) => submit(payload)}
            submitButton={{ className: 'mt-20 margin-auto w-px-145', title: 'Register', type: 'submit' }}
            buttonWrapper={'col-100'}
            onSuccess={() => window.location.reload()}
            {...client}
        >
            <div className={'col-md-50 mx-md-20 col-100'}>
                <Input {...form?.fields?.first_name} namespace={form.namespace}/>
                <Input {...form?.fields?.last_name} namespace={form.namespace}/>
                <Input {...form?.fields?.email} namespace={form.namespace}/>
            </div>
            <div className={'col-md-50 mx-md-20 col-100'}>
                <Input {...form?.fields?.password} namespace={form.namespace}/>
                <Input {...form?.fields?.securityQuestion} namespace={form.namespace}/>
                <Input {...form?.fields?.securityAnswer} namespace={form.namespace}/>
            </div>
        </Form>
        <div className={'position-center py-15'}>
            <Button buttonStyle={'link'} onClick={props.onClick}>
                <span className={'hover-opacity color--secondary-1 fs-16'}>login</span>
            </Button>
        </div>
    </div>;
};
