import moment from 'moment';
import * as React from "react";
import { Button } from '../../../../shared/components/buttons/button';
import { CONSTANTS } from '../../../../shared/constants';
import { Form } from '../../../../shared/form/form';
import { Input } from '../../../../shared/form/inputs/input';
import { requiredValidator } from '../../../../shared/form/validators/required-validator';
import { useClient } from '../../../../shared/hooks/client.hook';
import { useAuthContext } from '../../../../shared/hooks/context-hooks/auth-context.hook';
import { useForm } from '../../../../shared/hooks/reducers/form-reducer.hook';

export const ProfileBoxForm = (props: any) => {
    const { INPUTS: { TEXTAREA } } = CONSTANTS;
    const client = useClient();
    const { signin } = useAuthContext();
    const { inputState: { inputs }, inputHandler, isFormValid, getPayload } = useForm({
        inputs: {
            first_name: {
                value: '',
                valid: false
            },
            last_name: {
                value: '',
                valid: false
            },
            description: {
                value: '',
                valid: false
            }
        },
        isFormValid: false
    });

    const submit = async () => {
        const response: any = await client.client(`/users/recruiter/update`, 'PUT', { body: getPayload(inputs) });

        if (!client.error && !!response) {
            signin({ ...(response?.userData || {}), expiry: moment() });
        }
    };

    return <div>
        <Form
            isFormValid={isFormValid}
            className={'row justify-content-space-between'}
            onSubmit={() => submit()}
            submitButton={{ className: 'mt-20 margin-auto w-px-145', title: 'Update', type: 'submit' }}
            buttonWrapper={'col-100'}
            onSuccess={() => window.location.reload()}
            {...client}
        >
            <div className={'mx-md-20 col-100'}>
                <Input
                    onChange={inputHandler}
                    value={inputs.first_name.value}
                    name={'first_name'}
                    label={'First name'}
                    validators={[requiredValidator]}
                    className={'col-100 mt-11'}
                    labelClass={'fs-15 fw--700 mb-2'}
                />
                <Input
                    onChange={inputHandler}
                    value={inputs.last_name.value}
                    name={'last_name'}
                    label={'Last name'}
                    validators={[requiredValidator]}
                    className={'col-100 mt-11'}
                    labelClass={'fs-15 fw--700 mb-2'}
                />
                <Input
                    onChange={inputHandler}
                    value={inputs.description.value}
                    name={'description'}
                    label={'Job title'}
                    validators={[requiredValidator]}
                    className={'col-100 mt-11'}
                    labelClass={'fs-15 fw--700 mb-2'}
                    element={TEXTAREA}
                />
            </div>
        </Form>
        <div className={'position-center py-15'}>
            <Button buttonStyle={'link'} onClick={props.onClick}>
                <span className={'hover-opacity color--secondary-1 fs-16'}>login</span>
            </Button>
        </div>
    </div>;
};
