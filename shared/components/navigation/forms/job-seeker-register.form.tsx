import moment from 'moment';
import * as React from "react";
import { CvUploader } from '../../../form/file-uploader/cv-uploader';
import { Form } from "../../../form/form";
import { Input } from '../../../form/inputs/input';
import { emailValidator } from "../../../form/validators/email-validator";
import { comparePassword } from '../../../form/validators/password-confirmation';
import { requiredValidator } from "../../../form/validators/required-validator";
import { useClient } from "../../../hooks/client.hook";
import { useAuthContext } from '../../../hooks/context-hooks/auth-context.hook';
import { useForm } from '../../../hooks/reducers/form-reducer.hook';
import { redirect } from '../../../libs/helpers';

export const JobSeekerRegisterForm = (props: any) => {
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
            cv: {
                value: null,
                valid: false
            },
            educationLevel: {
                value: '',
                valid: false
            },
            currentJobTitle: {
                value: '',
                valid: false
            },
            currentSalary: {
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
            },
            profileShare: {
                value: false,
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

            redirect('/');
        }
    };

    return <div>
        <Form
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
                    name={'first_name'}
                    label={'First name'}
                    validators={[requiredValidator]}
                    className={'col-100 mt-11'}
                    labelClass={'fs-15 fw--700 mb-2'}
                    onChange={inputHandler}
                    value={inputs.first_name.value}
                />
                <Input
                    name={'last_name'}
                    label={'Last name'}
                    validators={[requiredValidator]}
                    className={'col-100 mt-11'}
                    labelClass={'fs-15 fw--700 mb-2'}
                    onChange={inputHandler}
                    value={inputs.last_name.value}
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
                <div className={'row pt-30'}>
                    <div className={'col-70 display-flex align-items-center'}>
                        <span className={'fs-15 fw--700 mb-2'}>Upload CV:</span>
                    </div>
                    <div className={'col-30 position-center'}>
                        <CvUploader
                            name={'cv'}
                            validators={[requiredValidator]}
                            onChange={inputHandler}
                            value={inputs.cv.value}
                        />
                    </div>
                </div>

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
            </div>
            <div className={'col-md-50 mx-md-20 col-100'}>

                <Input
                    name={'educationLevel'}
                    label={'Highest level of education'}
                    validators={[requiredValidator]}
                    className={'col-100 mt-11'}
                    labelClass={'fs-15 fw--700 mb-2'}
                    onChange={inputHandler}
                    value={inputs.educationLevel.value}
                />
                <Input
                    name={'currentJobTitle'}
                    label={'Current/most recent job title'}
                    validators={[requiredValidator]}
                    className={'col-100 mt-11'}
                    labelClass={'fs-15 fw--700 mb-2'}
                    onChange={inputHandler}
                    value={inputs.currentJobTitle.value}
                />
                <Input
                    name={'currentSalary'}
                    label={'Current/most recent salary'}
                    validators={[requiredValidator]}
                    className={'col-100 mt-11'}
                    labelClass={'fs-15 fw--700 mb-2'}
                    onChange={inputHandler}
                    value={inputs.currentSalary.value}
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
                    element={'checkbox'}
                    name={'profileShare'}
                    label={'Share your profile with trusted employers looking for candidates like you'}
                    validators={[]}
                    className={'col-100 mt-11'}
                    labelClass={'fs-15 fw--700 mb-2'}
                    onChange={inputHandler}
                    value={inputs.profileShare.value}
                />
            </div>
        </Form>
    </div>;
};
