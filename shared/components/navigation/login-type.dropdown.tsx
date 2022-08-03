import * as React from 'react';
import { Button } from '../buttons/button';
import { LoginIcon } from '../icons/icons';
import { LoginModal } from './libs/login.modal';
import { ProfileDropdown } from './libs/profile-dropdown';

export const LoginTypeDropdown = (props: any) => {
    const content = <div className={'row'}>
        <div>
            <LoginModal
                endpoint={'/users/recruiter'}
                trigger={<Button title={'Recruiter login'} buttonStyle={'secondary'} className={'ml-20 mt-3'}/>}
            />
        </div>
        <div className={'col-100 pt-5'}>
            <LoginModal
                endpoint={'/users/recruiter'}
                trigger={<Button title={'Job-seeker login'} buttonStyle={'secondary'} className={'ml-20 mt-3'}/>}
            />
        </div>
    </div>;
    return <ProfileDropdown
        className={'move-right'}
        trigger={<LoginIcon width={24} className={'text-color--light-1 pt-3 hover-opacity'}/>}
        content={content}
    />;
};
