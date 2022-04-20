import * as React from 'react';
import { useContext, useState } from 'react';
import { Button } from '../buttons/button';
import { LoginIcon, LogoutIcon } from '../icons/icons';
import { Modal } from '../modal/modal';
import { AuthContext } from '../../contexts/auth.context';
import { LoginForm } from "./login.form";
import { NavLink } from './nav-link';
import { ProfileDropdown } from './profile-dropdown';
import { RegisterForm } from "./register.form";

export const LoginButton = ({ isMobile }: any) => {
    const { signout, isLoggedIn } = useContext(AuthContext);
    const [isRegister, setIsRegister] = useState(false);

    if (true) {
        const content = <div className={'position-center row'}>
            <NavLink href={'/job-seeker-profile'}><span className={'col-100 fs-16 pt-5'}>Profile</span></NavLink>
            <NavLink href={'/my-jobs'}><span className={'col-100 fs-16 pt-5'}>Jobs</span></NavLink>
            <div className={'col-100 pt-5'}><LogoutIcon width={20} className={'text-color--light-1 pt-3'}/></div>
        </div>;

        return <Button
            textColor={'text-color--light-1'}
            buttonStyle={'transparent'}
            title={<ProfileDropdown trigger={<LoginIcon width={24} className={'text-color--light-1 pt-3'}/>} content={content}/>}
            onClick={() => signout()}
        />;
    }

    return <Modal
        level={2}
        className={'border-radius-px-5 p-15'}
        content={isRegister
            ? <RegisterForm onClick={() => setIsRegister(false)}/>
            : <LoginForm onClick={() => setIsRegister(true)}/>}
        size={{ sm: 90, md: 67, lg: 50, xl: 40 }}
        header={<h2 className={'header--3 text-align-center'}>{isRegister ? 'Sign up' : 'Sign in'}</h2>}
        wrapperClass={'align-self-center'}
        trigger={<Button
            textColor={'text-color--light-1'}
            buttonStyle={'transparent'}
            title={<LoginIcon width={24} className={'text-color--light-1 pt-3'}/>}
        />}
    />;
};
