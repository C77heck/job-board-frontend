import moment from 'moment';
import * as React from "react";
import { CONSTANTS } from '../../../constants';
import { IconUploader } from '../../../form/file-uploader/icon-uploader';
import { Form } from "../../../form/form";
import { Input } from '../../../form/inputs/input';
import { emailValidator } from "../../../form/validators/email-validator";
import { comparePassword } from '../../../form/validators/password-confirmation';
import { requiredValidator } from "../../../form/validators/required-validator";
import { useClient } from "../../../hooks/client.hook";
import { useAuthContext } from '../../../hooks/context-hooks/auth-context.hook';
import { useForm } from '../../../hooks/reducers/form-reducer.hook';
import { redirect } from '../../../libs/helpers';

export const RecruiterRegisterForm = (props: any) => {
    const client = useClient();
    const { signin } = useAuthContext();
    const { inputState: { inputs }, inputHandler, isFormValid, getPayload } = useForm({
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
            passwordConfirm: {
                value: '',
                valid: false
            },
            relatedIndustry: {
                value: [],
                valid: false
            },
            logo: {
                value: false,
                valid: false
            },
            companyType: {
                value: false,
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

        const payload = getPayload(inputs);

        payload.relatedIndustry = payload.relatedIndustry?.value || '';
        payload.companyType = payload.companyType ? 'Recruiter' : 'DirectEmployer';

        const response: any = await client.client(props.endpoint, 'POST', { body: payload });

        if (!client.error && !!response?.userData) {
            signin({ ...(response?.userData || {}), expiry: moment() });
        }

        redirect('/');
    };

    return <Form
        isFormValid={isFormValid}
        className={'row justify-content-space-between'}
        onSubmit={() => submit()}
        submitButton={{ className: 'mt-60 margin-auto w-px-145', title: 'Register', type: 'submit' }}
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
                value={inputs.company_name.value}
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
                name={'passwordConfirm'}
                label={'Password again'}
                validators={[comparePassword(inputs.password.value)]} // password validator to do
                type={'password'}
                className={'col-100 mt-11'}
                labelClass={'fs-15 fw--700 mb-2'}
                onChange={inputHandler}
                value={inputs.passwordConfirm.value}
            />
            <div className={'row pt-30'}>
                <div className={'col-70 display-flex align-items-center'}>
                    <span className={'fs-15 fw--700 mb-2'}>Upload company logo:</span>
                </div>
                <div className={'col-30 position-center'}>
                    <IconUploader
                        name={'logo'}
                        validators={[requiredValidator]}
                        onChange={inputHandler}
                        value={inputs.logo.value}
                    />
                </div>
            </div>
        </div>
        <div className={'col-md-50 mx-md-20 col-100'}>
            <Input
                name={'relatedIndustry'}
                label={'Industy type'}
                validators={[]}
                options={CONSTANTS.OPTIONS.INDUSTRY_TYPE}
                className={'col-100 mt-11'}
                labelClass={'fs-15 fw--700 mb-2'}
                onChange={inputHandler}
                value={inputs.relatedIndustry.value}
                element={'searchable_dropdown'}
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
            <Input
                name={'companyType'}
                label={'I represent a recruitment firm'}
                validators={[]}
                className={'col-100 mt-11'}
                labelClass={'fs-15 fw--700 mb-2'}
                onChange={inputHandler}
                value={inputs.companyType.value}
                element={'checkbox'}
            />
        </div>
    </Form>;
};
