import * as React from "react";
import { useEffect } from "react";
import { CONSTANTS } from '../../../shared/constants';
import { IconUploader } from '../../../shared/form/file-uploader/icon-uploader';
import { Form } from '../../../shared/form/form';
import { Input } from '../../../shared/form/inputs/input';
import { requiredValidator } from '../../../shared/form/validators/required-validator';
import { useClient } from '../../../shared/hooks/client.hook';
import { useForm } from '../../../shared/hooks/reducers/form-reducer.hook';

export const CompanyDataForm = (props: any) => {
    const { INPUTS: { TEXTAREA } } = CONSTANTS;
    const client = useClient();
    const { inputState: { inputs }, inputHandler, isFormValid, getPayload, setFormData } = useForm({
        inputs: {
            logo: {
                value: '',
                valid: false
            },
            company_name: {
                value: '',
                valid: false
            },
            address: {
                value: '',
                valid: false
            },
            description: {
                value: [],
                valid: false
            }
        },
        isFormValid: false
    });

    useEffect(() => {
        const inputs: any = {};
        for (const key of Object.keys(inputs)) {
            if (!props?.[key]) continue;

            inputs[key] = props[key];
        }

        setFormData(inputs);
    }, []);

    const submit = async () => {
        if (!props.endpoint) {
            return;
        }

        await client.client(props.endpoint, props.method, { body: getPayload(inputs) });
    };

    return <div>
        <Form
            className={'row justify-content-space-between'}
            isFormValid={isFormValid}
            onSubmit={() => submit()}
            submitButton={{ className: 'mt-60 margin-auto w-px-145', title: 'Post', type: 'submit' }}
            buttonWrapper={'col-100'}
            onSuccess={() => window.location.reload()}
            {...client}
        >
            <div className={'col-30 display-flex justify-content-start align-items-center'}>
                <IconUploader
                    alt={'logo'}
                    value={inputs.logo.value}
                    name={'logo'}
                    validators={[requiredValidator]}
                    className={'col-100 mt-11'}
                    labelClass={'fs-15 fw--700 mb-2'}
                    onChange={inputHandler}
                />
            </div>
            <div className={'col-70'}>
                <Input
                    onChange={inputHandler}
                    value={inputs.company_name.value}
                    name={'company_name'}
                    label={'Company name'}
                    validators={[requiredValidator]}
                    className={'col-100 mt-11'}
                    labelClass={'fs-15 fw--700 mb-2'}
                />
                <Input
                    onChange={inputHandler}
                    value={inputs.address.value}
                    name={'address'}
                    label={'Address'}
                    validators={[requiredValidator]}
                    className={'col-100 mt-11'}
                    labelClass={'fs-15 fw--700 mb-2'}
                />
            </div>
            <div className={'col-100'}>
                <Input
                    onChange={inputHandler}
                    value={inputs.description.value}
                    name={'description'}
                    label={'Description'}
                    validators={[requiredValidator]}
                    className={'col-100 mt-11'}
                    labelClass={'fs-15 fw--700 mb-2'}
                    element={TEXTAREA}
                />
            </div>
        </Form>
    </div>;
};
