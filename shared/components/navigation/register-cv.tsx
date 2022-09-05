import * as React from 'react';
import { Button } from '../buttons/button';
import { LoginModal } from './libs/login.modal';

export const RegisterCv = ({ isMobile }: any) => {
    return <LoginModal
        type={'job-seeker'}
        isMobile={isMobile}
        trigger={<Button
            buttonStyle={'primary'}
            title={'Register CV'}
        />}
    />;
};
