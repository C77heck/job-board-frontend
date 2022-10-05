import * as React from 'react';
import { Button } from '../buttons/button';
import { LoginModal } from './libs/login.modal';

export const RegisterRecruiter = ({ isMobile }: any) => {
    return <LoginModal
        type={'recruiter'}
        isMobile={isMobile}
        trigger={<Button buttonStyle={'secondary'} className={'ml-20 mt-3'}>
            <span className={'fs-15 color--light letter-spacing-2'}>Advertise now</span>
        </Button>}
    />;
};
