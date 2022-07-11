import * as React from 'react';
import { useState } from 'react';
import { Button } from '../buttons/button';
import { Modal } from '../modal/modal';
import { LoginForm } from './forms/login.form';
import { RegisterForm } from './forms/register.form';

export const RegisterCv = ({ isMobile }: any) => {
    const [isRegister, setIsRegister] = useState(false);

    return <Modal
        level={2}
        className={'border-radius-px-5 p-15'}
        content={isRegister
            ? <RegisterForm onClick={() => setIsRegister(false)}/>
            : <LoginForm onClick={() => setIsRegister(true)}/>}
        size={{ sm: 90, md: 67, lg: 50, xl: 40 }}
        header={<h2 className={'header--3 text-align-center'}>Sign in</h2>}
        wrapperClass={''}
        trigger={<Button
            textColor={'text-color--light-1 fs-mlg-17 fs-16'}
            buttonStyle={'primary'}
            title={'Register CV'}
        />}
    />;
};
