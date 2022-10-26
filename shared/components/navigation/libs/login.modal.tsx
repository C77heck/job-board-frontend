import * as React from 'react';
import { Modal } from '../../modal/modal';
import { LoginForm } from '../forms/login.form';

export interface LoginProps {
    trigger: JSX.Element;
    isMobile?: boolean;
    type: 'job-seeker' | 'recruiter';
}

export const LoginModal = ({ isMobile, trigger, type }: LoginProps) => {
    const getLinkByType = () => {
        switch (type) {
            case 'job-seeker':
                return '/job-seeker/registration';
            case 'recruiter':
                return '/recruiter/registration';
            default:
                return '/';
        }
    };

    return <Modal
        level={2}
        className={'border-radius-px-5 p-15'}
        content={<LoginForm endpoint={`/users/${type}/login`} link={getLinkByType()}/>}
        size={{ sm: 90, md: 67, lg: 50, xl: 40 }}
        header={<h2 className={'header--3 text-align-center'}>Sign in</h2>}
        wrapperClass={''}
        trigger={trigger}
    />;
};
