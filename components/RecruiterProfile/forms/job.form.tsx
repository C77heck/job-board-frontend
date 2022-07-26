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
import { JobCardProps } from '../../AdsListScreen/Components/job-card';

export const JobForm = (props: JobCardProps) => {
    const { INPUTS: { CHECKBOX, TEXTAREA, DATEPICKER } } = CONSTANTS;
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState(new FormStructure({
        title: new Field({
            name: 'title',
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
            value: '',
            validators: [requiredValidator],
            className: 'col-100 mt-11',
            labelClass: 'fs-15 fw--700 mb-2',
            element: CHECKBOX,
        }),
        description: new Field({
            name: 'description',
            label: 'Job description',
            value: '',
            validators: [],
            className: 'col-100 mt-11',
            labelClass: 'fs-15 fw--700 mb-2',
            element: TEXTAREA,
            rows: 10
        }),
        images: new Field({
            name: 'images',
            label: 'Images',
            value: [],
            validators: [],
            className: 'col-100 mt-11',
            labelClass: 'fs-15 fw--700 mb-2',
            rows: 10
        }),
    }, 'user-register'));

    useEffect(() => {
        if (props.editable) {
            for (const prop in form.fields) {
                // @ts-ignore
                if (props?.[prop]) {
                    // @ts-ignore
                    form.fields?.[prop]?.value = props?.[prop];
                    setForm(form);
                    setShowForm(true);
                }
            }
        }
    }, [props.editable]);

    if (props.editable && !showForm) {
        return null;
    }

    return <div>
        <Form
            form={form}
            className={'row justify-content-space-between'}
            onSubmit={(payload: any) => props.submit && props.submit(payload)}
            submitButton={{ className: 'mt-60 col-100 col-md-40 col-lg-22 margin-auto', title: 'Post', type: 'submit' }}
            onSuccess={() => window.location.reload()}
            {...(props.client || {})}
        >
            <div className={'col-md-50 mx-md-20 col-100'}>
                <Input {...form?.fields?.title} namespace={form.namespace}/>
                <Input {...form?.fields?.salary} namespace={form.namespace}/>
                <Input {...form?.fields?.location} namespace={form.namespace}/>
                <MultiImagesUploader {...form?.fields?.images} namespace={form.namespace}/>
            </div>
            <div className={'col-md-50 mx-md-20 col-100'}>
                <Input {...form?.fields?.expiresOn} namespace={form.namespace}/>
                <Input {...form?.fields?.isPremium} namespace={form.namespace}/>
                <Input {...form?.fields?.description} namespace={form.namespace}/>
            </div>
        </Form>
    </div>;
};
