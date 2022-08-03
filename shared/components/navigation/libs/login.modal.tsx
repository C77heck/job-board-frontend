import * as React from 'react';
import { useState } from 'react';
import { Modal } from '../../modal/modal';
import { LoginForm } from '../forms/login.form';
import { RegisterForm } from '../forms/register.form';

export interface LoginProps {
    trigger: JSX.Element;
    isMobile?: boolean;
    endpoint: string;
}

export const LoginModal = ({ isMobile, trigger, endpoint }: LoginProps) => {
    const [isRegister, setIsRegister] = useState(false);

    return <Modal
        level={2}
        className={'border-radius-px-5 p-15'}
        content={isRegister
            ? <RegisterForm endpoint={`${endpoint}/signup`} onClick={() => setIsRegister(false)}/>
            : <LoginForm endpoint={`${endpoint}/login`} onClick={() => setIsRegister(true)}/>}
        size={{ sm: 90, md: 67, lg: 50, xl: 40 }}
        header={<h2 className={'header--3 text-align-center'}>Sign in</h2>}
        wrapperClass={''}
        trigger={trigger}
    />;
};
