import moment from 'moment';
import * as React from "react";
import { Form } from "../../../form/form";
import { Input } from '../../../form/inputs/input';
import { emailValidator } from "../../../form/validators/email-validator";
import { requiredValidator } from "../../../form/validators/required-validator";
import { useClient } from "../../../hooks/client.hook";
import { useAuthContext } from '../../../hooks/context-hooks/auth-context.hook';
import { useForm } from '../../../hooks/reducers/form-reducer.hook';
import { Button } from "../../buttons/button";

export const RecruiterRegisterForm = (props: any) => {
    const client = useClient();
    const { signin } = useAuthContext();
    const { inputState: { inputs }, inputHandler, isFormValid, destroy, getPayload } = useForm({
        inputs: {
            company_name: {
                value: '',
                valid: false
            },
            email: {
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
        if (!isFormValid) {
            return;
        }

        const response: any = await client.client(props.endpoint, 'POST', { body: getPayload(inputs) });

        if (!client.error && !!response?.userDat) {
            signin({ ...(response?.userData || {}), expiry: moment() });
        }
    };

    return <div>
        <Form
            isFormValid={isFormValid}
            className={'row justify-content-space-between'}
            onSubmit={() => submit()}
            submitButton={{ className: 'mt-20 margin-auto w-px-145', title: 'Register', type: 'submit' }}
            buttonWrapper={'col-100'}
            onSuccess={() => window.location.reload()}
            {...client}
        >
            <div className={'col-md-50 mx-md-20 col-100'}>
                <Input
                    name={'company_name'}
                    label={'Company name'}
                    validators={[requiredValidator]}
                    className={'col-100 mt-11'}
                    labelClass={'fs-15 fw--700 mb-2'}
                    onChange={inputHandler}
                    value={inputs.first_name.value}
                />
                <Input
                    name={'email'}
                    label={'Email'}
                    validators={[emailValidator]}
                    placeholder={'example@example.com'}
                    className={'col-100 mt-11'}
                    labelClass={'fs-15 fw--700 mb-2'}
                    onChange={inputHandler}
                    value={inputs.email.value}
                />
            </div>
            <div className={'col-md-50 mx-md-20 col-100'}>
                <Input
                    name={'password'}
                    label={'Password'}
                    validators={[requiredValidator]} // password validator to do
                    type={'password'}
                    className={'col-100 mt-11'}
                    labelClass={'fs-15 fw--700 mb-2'}
                    onChange={inputHandler}
                    value={inputs.password.value}
                />
                <Input
                    name={'securityQuestion'}
                    label={'Security hint'}
                    validators={[requiredValidator]}
                    placeholder={'First pet name, first love...'}
                    className={'col-100 mt-11'}
                    labelClass={'fs-15 fw--700 mb-2'}
                    onChange={inputHandler}
                    value={inputs.securityQuestion.value}
                />
                <Input
                    name={'securityAnswer'}
                    label={'Answer'}
                    validators={[requiredValidator]}
                    className={'col-100 mt-11'}
                    labelClass={'fs-15 fw--700 mb-2'}
                    onChange={inputHandler}
                    value={inputs.securityAnswer.value}
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
