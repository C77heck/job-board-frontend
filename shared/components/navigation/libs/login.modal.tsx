import * as React from 'react';
import { useState } from 'react';
import { Modal } from '../../modal/modal';
import { JobSeekerRegisterForm } from '../forms/job-seeker-register.form';
import { LoginForm } from '../forms/login.form';
import { RecruiterRegisterForm } from '../forms/recruiter-register.form';

export interface LoginProps {
    trigger: JSX.Element;
    isMobile?: boolean;
    type: 'job-seeker' | 'recruiter';
}

export const LoginModal = ({ isMobile, trigger, type }: LoginProps) => {
    const [isRegister, setIsRegister] = useState(false);

    const getRegisterFormByType = () => {
        switch (type) {
            case 'job-seeker':
                return <JobSeekerRegisterForm endpoint={`/users/${type}/signup`} onClick={() => setIsRegister(false)}/>;
            case 'recruiter':
                return <RecruiterRegisterForm endpoint={`/users/${type}/signup`} onClick={() => setIsRegister(false)}/>;
            default:
                return null;
        }
    };

    return <Modal
        level={2}
        className={'border-radius-px-5 p-15'}
        content={isRegister
            ? getRegisterFormByType()
            : <LoginForm endpoint={`/users/${type}/login`} onClick={() => setIsRegister(true)}/>}
        size={{ sm: 90, md: 67, lg: 50, xl: 40 }}
        header={<h2 className={'header--3 text-align-center'}>Sign in</h2>}
        wrapperClass={''}
        trigger={trigger}
    />;
};
