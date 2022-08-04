import * as React from "react";
import { useEffect, useState } from "react";
import { CONSTANTS } from '../../../shared/constants';
import { Field } from '../../../shared/form/field';
import { IconUploader } from '../../../shared/form/file-uploader/icon-uploader';
import { Form } from '../../../shared/form/form';
import { FormStructure } from '../../../shared/form/form.structure';
import { Input } from '../../../shared/form/input';
import { requiredValidator } from '../../../shared/form/validators/required-validator';
import { useClient } from '../../../shared/hooks/client';

export const CompanyDataForm = (props: any) => {
    const { INPUTS: { TEXTAREA } } = CONSTANTS;
    const client = useClient();
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState(new FormStructure({
        logo: new Field({
            name: 'logo',
            value: props.data?.logo?.data || '',
            validators: [requiredValidator],
            className: 'col-100 mt-11',
            labelClass: 'fs-15 fw--700 mb-2',
        }),
        company_name: new Field({
            name: 'company_name',
            label: 'Company name',
            value: props.data?.company_name?.data || '',
            validators: [requiredValidator],
            className: 'col-100 mt-11',
            labelClass: 'fs-15 fw--700 mb-2',
        }),
        address: new Field({
            name: 'address',
            label: 'Address',
            value: props.data?.address?.data || '',
            validators: [requiredValidator],
            className: 'col-100 mt-11',
            labelClass: 'fs-15 fw--700 mb-2',
        }),
        description: new Field({
            name: 'description',
            label: 'Description',
            value: props.data?.description?.data || '',
            validators: [],
            className: 'col-100 mt-11',
            labelClass: 'fs-15 fw--700 mb-2',
            element: TEXTAREA,
            rows: 7
        }),
    }, 'user-data-update'));

    useEffect(() => {
        console.log(props.data);
        for (const prop in form.fields) {
            // @ts-ignore
            if (props?.[prop]) {
                // @ts-ignore
                form.fields?.[prop]?.value = props?.[prop];
                setForm(form);
                setShowForm(true);
            }
        }
    }, [props.data]);

    const submit = async (data: any) => {
        if (!props.endpoint) {
            return;
        }
        console.log({ ...props }, client);
        await client.client(props.endpoint, props.method, { body: data });
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
            <div className={'col-30 display-flex justify-content-start align-items-center'}>
                <IconUploader {...form?.fields?.logo} namespace={form.namespace}/>
            </div>
            <div className={'col-70'}>
                <Input {...form?.fields?.company_name} namespace={form.namespace}/>
                <Input {...form?.fields?.address} namespace={form.namespace}/>
            </div>
            <div className={'col-100'}>
                <Input {...form?.fields?.description} namespace={form.namespace}/>
            </div>
        </Form>
    </div>;
};
