import moment from 'moment';
import * as React from "react";
import { CONSTANTS } from '../../../shared/constants';
import { MultiImagesUploader } from '../../../shared/form/file-uploader/multi-images-uploader';
import { Form } from '../../../shared/form/form';
import { Input } from '../../../shared/form/inputs/input';
import { requiredValidator } from '../../../shared/form/validators/required-validator';
import { useClient } from '../../../shared/hooks/client.hook';
import { useForm } from '../../../shared/hooks/reducers/form-reducer.hook';
import { Methods } from '../../../shared/libs/repository';
import { JobCardProps } from '../../AdsListScreen/Components/job-card';

export interface JobFormProps extends JobCardProps {
    isUpdate?: boolean;
    method: Methods;
    inputs?: any;
}

export const JobForm = (props: JobFormProps) => {
    const { INPUTS: { CHECKBOX, TEXTAREA, DATEPICKER, SEARCHABLE_DROPDOWN } } = CONSTANTS;
    const client = useClient();
    const form = {
        title: {
            value: props?.title || '',
            valid: false
        },
        salary: {
            value: props?.salary || '',
            valid: false
        },
        location: {
            value: props?.location || '',
            valid: false
        },
        images: {
            value: props?.images || [],
            valid: false
        },
        expiresOn: {
            value: props?.expiresOn || moment().add(1, 'month').format('YYYY-MM-DD').toString(),
            valid: false
        },
        isPremium: {
            value: props?.isPremium || false,
            valid: false
        },
        description: {
            value: props?.description || '',
            valid: false
        },
        jobType: {
            value: props?.jobType || '',
            valid: false
        },
        industryType: {
            value: props?.industryType || '',
            valid: false
        },
    };

    const { inputState: { inputs }, inputHandler, isFormValid, getPayload } = useForm({
        inputs: form,
        isFormValid: false
    });

    const submit = async () => {
        if (!isFormValid || !props.endpoint) {
            return;
        }

        await client.client(props.endpoint, props.method, { body: getPayload(inputs) });
    };

    return <Form
        className={'row justify-content-space-between'}
        isFormValid={isFormValid}
        onSubmit={() => submit()}
        submitButton={{ className: 'mt-60 margin-auto w-px-145', title: 'Post', type: 'submit' }}
        buttonWrapper={'col-100'}
        onSuccess={() => window.location.reload()}
        {...client}
    >
        <div className={'col-md-50 mx-md-20 col-100'}>
            <Input
                onChange={inputHandler}
                value={inputs.title.value}
                name={'title'}
                label={'Job title'}
                validators={[requiredValidator]}
                className={'col-100 mt-11'}
                labelClass={'fs-15 fw--700 mb-2'}
            />
            <Input
                onChange={inputHandler}
                value={inputs.salary.value}
                name={'salary'}
                label={'Salary'}
                validators={[requiredValidator]}
                className={'col-100 mt-11'}
                labelClass={'fs-15 fw--700 mb-2'}
            />
            <Input
                onChange={inputHandler}
                value={inputs.location.value}
                name={'location'}
                label={'Location'}
                validators={[requiredValidator]}
                className={'col-100 mt-11'}
                labelClass={'fs-15 fw--700 mb-2'}
            />
            <MultiImagesUploader
                validators={[]}
                value={inputs.images.value}
                name={'images'}
                onChange={inputHandler}
                id={'profileImageUpload'}
            />
        </div>
        <div className={'col-md-50 mx-md-20 col-100'}>
            <Input
                onChange={inputHandler}
                value={inputs.expiresOn.value}
                name={'expiresOn'}
                label={'Expiry date'}
                validators={[requiredValidator]}
                className={'col-100 mt-11'}
                labelClass={'fs-15 fw--700 mb-2'}
                element={DATEPICKER}
            />
            <Input
                onChange={inputHandler}
                value={inputs.isPremium.value}
                name={'isPremium'}
                label={'Premium listing'}
                validators={[requiredValidator]}
                className={'col-100 mt-11'}
                labelClass={'fs-15 fw--700 mb-2'}
                element={CHECKBOX}
            />
            <Input
                onChange={inputHandler}
                value={inputs.description.value}
                name={'description'}
                label={'Job description'}
                validators={[]}
                className={'col-100 mt-11'}
                labelClass={'fs-15 fw--700 mb-2'}
                element={TEXTAREA}
            />
            <Input
                onChange={inputHandler}
                value={inputs.jobType.value}
                name={'jobType'}
                label={'Type of job'}
                options={CONSTANTS.OPTIONS.JOB_TYPE}
                validators={[]}
                className={'col-100 mt-11'}
                labelClass={'fs-15 fw--700 mb-2'}
                element={SEARCHABLE_DROPDOWN}
            />
            <Input
                onChange={inputHandler}
                value={inputs.industryType.value}
                name={'industryType'}
                label={'Type of industry'}
                options={CONSTANTS.OPTIONS.INDUSTRY_TYPE}
                validators={[requiredValidator]}
                className={'col-100 mt-11'}
                labelClass={'fs-15 fw--700 mb-2'}
                element={SEARCHABLE_DROPDOWN}
            />
        </div>
    </Form>;
};
