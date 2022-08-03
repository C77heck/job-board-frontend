import * as React from 'react';
import { Button } from '../buttons/button';
import { LoginModal } from './libs/login.modal';

export const RegisterRecruiter = ({ isMobile }: any) => {
    return <LoginModal
        type={'recruiter'}
        isMobile={isMobile}
        trigger={<Button title={'Advertise now'} buttonStyle={'secondary'} className={'ml-20 mt-3'}/>}
    />;
};
