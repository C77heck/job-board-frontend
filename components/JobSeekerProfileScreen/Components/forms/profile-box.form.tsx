import moment from 'moment';
import * as React from "react";
import { useContext, useState } from "react";
import { Button } from '../../../../shared/components/buttons/button';
import { CONSTANTS } from '../../../../shared/constants';
import { AuthContext } from '../../../../shared/contexts/auth.context';
import { Field } from '../../../../shared/form/field';
import { Form } from '../../../../shared/form/form';
import { FormStructure } from '../../../../shared/form/form.structure';
import { Input } from '../../../../shared/form/input';
import { requiredValidator } from '../../../../shared/form/validators/required-validator';
import { useClient } from '../../../../shared/hooks/client';

// TODO -> these will have to be dealt with. probably with an attachment service.
// we could build a local service that serves staff from the local machine.
//     logo?: string,
//     meta?: string[],
//     images?: string[];

export const ProfileBoxForm = (props: any) => {
    const { INPUTS: { TEXTAREA } } = CONSTANTS;
    const client = useClient();
    const { signin, userId } = useContext(AuthContext);
    const [form, setForm] = useState(new FormStructure({
        first_name: new Field({
            name: 'first_name',
            label: 'First name',
            value: props?.data?.['first_name']?.data || '',
            validators: [requiredValidator],
            className: 'col-100 mt-11',
            labelClass: 'fs-15 fw--700 mb-2',
        }),
        last_name: new Field({
            name: 'last_name',
            label: 'Last name',
            value: props?.data?.['last_name']?.data || '',
            validators: [requiredValidator],
            className: 'col-100 mt-11',
            labelClass: 'fs-15 fw--700 mb-2',
        }),
        description: new Field({
            element: TEXTAREA,
            type: TEXTAREA,
            name: 'description',
            label: 'Description',
            value: props?.data?.['description']?.data || '',
            validators: [],
            className: 'col-100 mt-11',
            labelClass: 'fs-15 fw--700 mb-2',
        }),
    }, 'profile-box'));

    const submit = async (data: any) => {
        const response: any = await client.client(`/users/update`, 'PUT', { body: data });

        if (!client.error && !!response) {
            signin({ ...(response?.userData || {}), expiry: moment() });
        }
    };

    return <div>
        <Form
            form={form}
            className={'row justify-content-space-between'}
            onSubmit={(payload: any) => submit(payload)}
            submitButton={{ className: 'mt-20 col-100 col-md-40 col-lg-22 margin-auto', title: 'Update', type: 'submit' }}
            onSuccess={() => window.location.reload()}
            {...client}
        >
            <div className={'mx-md-20 col-100'}>
                <Input {...form?.fields?.first_name} namespace={form.namespace}/>
                <Input {...form?.fields?.last_name} namespace={form.namespace}/>
                <Input {...form?.fields?.description} namespace={form.namespace}/>
            </div>
        </Form>
        <div className={'position-center py-15'}>
            <Button title={'login'} buttonStyle={'link'} onClick={props.onClick}/>
        </div>
    </div>;
};
