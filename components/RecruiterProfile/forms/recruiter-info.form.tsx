import moment from 'moment';
import * as React from "react";
import { useContext } from "react";
import { Button } from '../../../shared/components/buttons/button';
import { CONSTANTS } from '../../../shared/constants';
import { AuthContext } from '../../../shared/contexts/auth.context';
import { Field } from '../../../shared/form/field';
import { Form } from '../../../shared/form/form';
import { FormStructure } from '../../../shared/form/form.structure';
import { Input } from '../../../shared/form/input';
import { requiredValidator } from '../../../shared/form/validators/required-validator';
import { useClient } from '../../../shared/hooks/client';

export const RecruiterInfoForm = (props: any) => {
    const { INPUTS: { CHECKBOX } } = CONSTANTS;
    const client = useClient();
    const { signin } = useContext(AuthContext);
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
        isRecruiter: new Field({
            name: 'isRecruiter',
            label: 'Are you a recruiter?',
            value: false,
            validators: [],
            className: 'col-100 mt-11',
            labelClass: 'fs-15 fw--700 mb-2',
            element: CHECKBOX
        }),
    }, 'user-register');

    const submit = async (data: any) => {
        const response: any = await client.client(`/users/signup`, 'POST', { body: data });

        if (!client.error && !!response) {
            signin({ ...(response?.userData || {}), expiry: moment() });
        }
    };

    return <div>
        <Form
            form={form}
            className={'row justify-content-space-between'}
            onSubmit={(payload: any) => submit(payload)}
            submitButton={{ className: 'mt-20 col-100 col-md-40 col-lg-22 margin-auto', title: 'Register', type: 'submit' }}
            onSuccess={() => window.location.reload()}
            {...client}
        >
            <div className={'col-md-50 mx-md-20 col-100'}>
                <Input {...form?.fields?.first_name} namespace={form.namespace}/>
                <Input {...form?.fields?.last_name} namespace={form.namespace}/>
                <Input {...form?.fields?.isRecruiter} namespace={form.namespace}/>
            </div>
            <div className={'col-md-50 mx-md-20 col-100'}>
                <Input {...form?.fields?.password} namespace={form.namespace}/>
                <Input {...form?.fields?.securityQuestion} namespace={form.namespace}/>
                <Input {...form?.fields?.securityAnswer} namespace={form.namespace}/>
            </div>
        </Form>
        <div className={'position-center py-15'}>
            <Button title={'login'} buttonStyle={'link'} onClick={props.onClick}/>
        </div>
    </div>;
};
