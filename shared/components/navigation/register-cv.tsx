import * as React from 'react';
import { Button } from '../buttons/button';
import { LoginModal } from './libs/login.modal';

export const RegisterCv = ({ isMobile }: any) => {
    return <LoginModal
        endpoint={'/users/job-seeker'}
        isMobile={isMobile}
        trigger={<Button
            textColor={'text-color--light-1 fs-mlg-17 fs-16'}
            buttonStyle={'primary'}
            title={'Register CV'}
        />}
    />;
};
