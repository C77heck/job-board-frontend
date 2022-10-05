import * as React from 'react';
import { Button } from '../buttons/button';
import { LoginModal } from './libs/login.modal';

export const RegisterCv = ({ isMobile }: any) => {
    return <LoginModal
        type={'job-seeker'}
        isMobile={isMobile}
        trigger={<Button
            buttonStyle={'primary'}
            className={'background-color--yellow'}
        >
            <span className={'fs-15 color--light letter-spacing-2'}>Register CV</span>
        </Button>}
    />;
};
