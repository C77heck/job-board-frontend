import * as React from 'react';
import { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/auth.context';
import { Button } from '../buttons/button';
import { LoginIcon } from '../icons/icons';
import { Modal } from '../modal/modal';
import { EmployeeDropdown } from './employee-dropdown';
import { ProfileDropdown } from './extras/profile-dropdown';
import { LoginForm } from "./forms/login.form";
import { RegisterForm } from "./forms/register.form";
import { RecruiterDropdown } from './recruiter-dropdown';

export const LoginButton = ({ isMobile }: any) => {
    const { signout, isLoggedIn, userData } = useContext(AuthContext);
    const [isRegister, setIsRegister] = useState(false);

    const signoutHandler = () => {
        try {
            signout();
            window.location.reload();
        } catch (e) {
            console.log(e);
        }
    };

    if (isLoggedIn) {
        return <Button
            textColor={'text-color--light-1'}
            buttonStyle={'transparent'}
            title={<ProfileDropdown
                className={'move-right'}
                trigger={<LoginIcon width={24} className={'text-color--light-1 pt-3 hover-opacity'}/>}
                content={!userData?.isRecruiter ? <EmployeeDropdown signoutHandler={signoutHandler}/> : <RecruiterDropdown signoutHandler={signoutHandler}/>}
            />}
            onClick={() => console.log('signout pressed')}
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
