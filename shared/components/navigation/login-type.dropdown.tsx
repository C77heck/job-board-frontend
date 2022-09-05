import * as React from 'react';
import { LoginIcon } from '../icons/icons';
import { Hr } from '../ui-misc/hr';
import { LoginModal } from './libs/login.modal';
import { ProfileDropdown } from './libs/profile-dropdown';

export const LoginTypeDropdown = (props: any) => {
    const trigger = (text: string) => <div className={'p-5 hover-primary'}><span className={'fw--700 fs-15'}>{text}</span></div>;

    const content = <div className={'display-flex justify-content-end flex-column align-items-end'}>
        <div>
            <LoginModal
                type={'recruiter'}
                trigger={trigger('Recruiter login')}
            />
        </div>
        <Hr/>
        <div>
            <LoginModal
                type={'job-seeker'}
                trigger={trigger('Job-seeker login')}
            />
        </div>
    </div>;
    return <ProfileDropdown
        className={'move-right w-px-160'}
        trigger={<LoginIcon width={24} className={'text-color--light-1 pt-3 hover-opacity'}/>}
        content={content}
    />;
};
