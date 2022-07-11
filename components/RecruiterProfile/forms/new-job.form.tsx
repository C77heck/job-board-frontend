import * as React from "react";
import { useContext } from "react";
import { CONSTANTS } from '../../../shared/constants';
import { AuthContext } from '../../../shared/contexts/auth.context';
import { Field } from '../../../shared/form/field';
import { Form } from '../../../shared/form/form';
import { FormStructure } from '../../../shared/form/form.structure';
import { Input } from '../../../shared/form/input';
import { requiredValidator } from '../../../shared/form/validators/required-validator';
import { useClient } from '../../../shared/hooks/client';

// datas we need
// title, money, location, description
export const NewJobForm = (props: any) => {
    const { INPUTS: { CHECKBOX } } = CONSTANTS;
    const client = useClient();
    const { isLoggedIn } = useContext(AuthContext);
    const form = new FormStructure({
        job_title: new Field({
            name: 'job_title',
            label: 'Job title',
            value: '',
            validators: [requiredValidator],
            className: 'col-100 mt-11',
            labelClass: 'fs-15 fw--700 mb-2',
        }),
        salary: new Field({
            name: 'salary',
            label: 'Salary',
            value: '',
            validators: [requiredValidator],
            className: 'col-100 mt-11',
            labelClass: 'fs-15 fw--700 mb-2',
        }),

        location: new Field({
            name: 'location',
            label: 'Location',
            value: '',
            validators: [requiredValidator],
            className: 'col-100 mt-11',
            labelClass: 'fs-15 fw--700 mb-2',
        }),
        description: new Field({
            name: 'description',
            label: 'Job description',
            value: '',
            validators: [],
            className: 'col-100 mt-11',
            labelClass: 'fs-15 fw--700 mb-2',
            element: 'textarea',
            rows: 10
        }),

    }, 'user-register');

    const submit = async (data: any) => {
        const response: any = await client.client(`/users/signup`, 'POST', { body: data });
        console.log(response);
    };

    return <div>
        <Form
            form={form}
            className={'row justify-content-space-between'}
            onSubmit={(payload: any) => submit(payload)}
            submitButton={{ className: 'mt-60 col-100 col-md-40 col-lg-22 margin-auto', title: 'Post', type: 'submit' }}
            onSuccess={() => window.location.reload()}
            {...client}
        >
            <div className={'col-md-50 mx-md-20 col-100'}>
                <Input {...form?.fields?.job_title} namespace={form.namespace}/>
                <Input {...form?.fields?.salary} namespace={form.namespace}/>
                <Input {...form?.fields?.location} namespace={form.namespace}/>
            </div>
            <div className={'col-md-50 mx-md-20 col-100'}>
                <Input {...form?.fields?.description} namespace={form.namespace}/>
            </div>
        </Form>
    </div>;
};
