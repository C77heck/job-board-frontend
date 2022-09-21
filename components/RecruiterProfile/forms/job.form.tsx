import moment from 'moment';
import * as React from "react";
import { useEffect, useState } from "react";
import { CONSTANTS } from '../../../shared/constants';
import { Field } from '../../../shared/form/field';
import { MultiImagesUploader } from '../../../shared/form/file-uploader/multi-images-uploader';
import { Form } from '../../../shared/form/form';
import { FormStructure } from '../../../shared/form/form.structure';
import { Input } from '../../../shared/form/input';
import { requiredValidator } from '../../../shared/form/validators/required-validator';
import { useClient } from '../../../shared/hooks/client';
import { JobCardProps } from '../../AdsListScreen/Components/job-card';

export const JobForm = (props: JobCardProps & any) => {
    const { INPUTS: { CHECKBOX, TEXTAREA, DATEPICKER } } = CONSTANTS;
    const client = useClient();
    const [form, setForm] = useState(new FormStructure({
        title: new Field({
            name: 'title',
            label: 'Job title',
            value: props?.title,
            validators: [requiredValidator],
            className: 'col-100 mt-11',
            labelClass: 'fs-15 fw--700 mb-2',
        }),
        salary: new Field({
            name: 'salary',
            label: 'Salary',
            value: props?.salary,
            validators: [requiredValidator],
            className: 'col-100 mt-11',
            labelClass: 'fs-15 fw--700 mb-2',
        }),
        location: new Field({
            name: 'location',
            label: 'Location',
            value: props?.location,
            validators: [requiredValidator],
            className: 'col-100 mt-11',
            labelClass: 'fs-15 fw--700 mb-2',
        }),
        expiresOn: new Field({
            name: 'expiresOn',
            label: 'Expiry date',
            value: moment().add(1, 'month').format('YYYY-MM-DD').toString(),
            validators: [requiredValidator],
            className: 'col-100 mt-11',
            labelClass: 'fs-15 fw--700 mb-2',
            element: DATEPICKER,
        }),
        isPremium: new Field({
            name: 'isPremium',
            label: 'Premium listing',
            value: props?.isPremium,
            validators: [requiredValidator],
            className: 'col-100 mt-11',
            labelClass: 'fs-15 fw--700 mb-2',
            element: CHECKBOX,
        }),
        description: new Field({
            name: 'description',
            label: 'Job description',
            value: props?.description || '',
            validators: [],
            className: 'col-100 mt-11',
            labelClass: 'fs-15 fw--700 mb-2',
            element: TEXTAREA,
            rows: 10
        }),
        images: new Field({
            name: 'images',
            label: 'Images',
            value: props?.images || [],
            validators: [],
            className: 'col-100 mt-11',
            labelClass: 'fs-15 fw--700 mb-2',
        }),
        jobType: new Field({
            name: 'jobType',
            label: 'Type of job',
            value: props?.jobType || [],
            options: CONSTANTS.OPTIONS.JOB_TYPE,
            className: 'col-100 mt-11',
            labelClass: 'fs-15 fw--700 mb-2',
            element: 'searchable_dropdown',
        }),
        industryType: new Field({
            name: 'industryType',
            label: 'Type of industry',
            value: props?.industryType || [],
            options: CONSTANTS.OPTIONS.INDUSTRY_TYPE,
            className: 'col-100 mt-11',
            labelClass: 'fs-15 fw--700 mb-2',
            element: 'searchable_dropdown',
        }),
    }, 'user-register'));

    useEffect(() => {
        for (const prop in form.fields) {
            // @ts-ignore
            if (props?.[prop]) {
                // @ts-ignore
                form.fields?.[prop]?.value = props?.[prop];
                setForm(form);
            }
        }
    }, []);

    const submit = async (data: any) => {
        if (!props.endpoint) {
            return;
        }

        await client.client(props.endpoint, props.method, { body: data });
    };

    return <div>
        <Form
            form={form}
            className={'row justify-content-space-between'}
            onSubmit={(payload: any) => submit(payload)}
            submitButton={{ className: 'mt-60 margin-auto w-px-145', title: 'Post', type: 'submit' }}
            buttonWrapper={'col-100'}
            onSuccess={() => window.location.reload()}
            {...client}
        >
            <div className={'col-md-50 mx-md-20 col-100'}>
                <Input {...form?.fields?.title} namespace={form.namespace}/>
                <Input {...form?.fields?.salary} namespace={form.namespace}/>
                <Input {...form?.fields?.location} namespace={form.namespace}/>
                <MultiImagesUploader
                    {...form?.fields?.images}
                    value={form?.fields?.images?.value as string[]}
                    namespace={form.namespace}
                    id={'profileImageUpload'}
                />
            </div>
            <div className={'col-md-50 mx-md-20 col-100'}>
                <Input {...form?.fields?.expiresOn} namespace={form.namespace}/>
                <Input {...form?.fields?.jobType} namespace={form.namespace}/>
                <Input {...form?.fields?.industryType} namespace={form.namespace}/>
                <Input {...form?.fields?.isPremium} namespace={form.namespace}/>
                <Input {...form?.fields?.description} namespace={form.namespace}/>
            </div>
        </Form>
    </div>;
};
