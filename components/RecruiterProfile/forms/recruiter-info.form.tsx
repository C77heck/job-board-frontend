import moment from 'moment';
import * as React from "react";
import { Button } from '../../../shared/components/buttons/button';
import { CONSTANTS } from '../../../shared/constants';
import { Form } from '../../../shared/form/form';
import { Input } from '../../../shared/form/inputs/input';
import { requiredValidator } from '../../../shared/form/validators/required-validator';
import { useClient } from '../../../shared/hooks/client.hook';
import { useAuthContext } from '../../../shared/hooks/context-hooks/auth-context.hook';
import { useForm } from '../../../shared/hooks/reducers/form-reducer.hook';

export const RecruiterInfoForm = (props: any) => {
    const { INPUTS: { CHECKBOX } } = CONSTANTS;
    const client = useClient();
    const { signin } = useAuthContext();
    const { inputState: { inputs }, inputHandler, isFormValid, getPayload, setFormData } = useForm({
        inputs: {
            first_name: {
                value: '',
                valid: false
            },
            last_name: {
                value: '',
                valid: false
            },
            password: {
                value: '',
                valid: false
            },
            securityQuestion: {
                value: '',
                valid: false
            },
            securityAnswer: {
                value: '',
                valid: false
            }
        },
        isFormValid: false
    });

    const submit = async () => {
        const response: any = await client.client(`/users/recruiter/signup`, 'POST', { body: getPayload(inputs) });

        if (!client.error && !!response) {
            signin({ ...(response?.userData || {}), expiry: moment() });
        }
    };

    return <div>
        <Form
            isFormValid={isFormValid}
            className={'row justify-content-space-between'}
            onSubmit={() => submit()}
            submitButton={{ className: 'mt-20 margin-auto', title: 'Register', type: 'submit' }}
            buttonWrapper={'col-100'}
            onSuccess={() => window.location.reload()}
            {...client}
        >
            <div className={'col-md-50 mx-md-20 col-100'}>
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
            </div>
            <div className={'col-md-50 mx-md-20 col-100'}>
                <Input
                    onChange={inputHandler}
                    value={inputs.password.value}
                    name={'password'}
                    label={'Last name'}
                    validators={[requiredValidator]}
                    className={'col-100 mt-11'}
                    labelClass={'fs-15 fw--700 mb-2'}
                    type={'password'}
                />
                <Input
                    onChange={inputHandler}
                    value={inputs.securityQuestion.value}
                    name={'securityQuestion'}
                    label={'Security hint'}
                    validators={[requiredValidator]}
                    className={'col-100 mt-11'}
                    labelClass={'fs-15 fw--700 mb-2'}
                    placeholder={'First pet name, first love...'}
                />
                <Input
                    onChange={inputHandler}
                    value={inputs.securityAnswer.value}
                    name={'securityAnswer'}
                    label={'Answer'}
                    validators={[requiredValidator]}
                    className={'col-100 mt-11'}
                    labelClass={'fs-15 fw--700 mb-2'}
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
