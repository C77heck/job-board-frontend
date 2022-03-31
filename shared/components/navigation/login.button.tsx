import * as React from 'react';
import { useContext, useState } from 'react';
import { Button } from '../buttons/button';
import { LoginIcon, LogoutIcon } from '../icons/icons';
import { Modal } from '../modal/modal';
import { AuthContext } from '../../contexts/auth.context';
import { LoginForm } from "./login.form";
import { RegisterForm } from "./register.form";

export const LoginButton = ({ isMobile }: any) => {
    const { signout, isLoggedIn } = useContext(AuthContext);
    const [isRegister, setIsRegister] = useState(false);

    if (isLoggedIn) {
        return <Button
            textColor={'text-color--light-1'}
            buttonStyle={'transparent'}
            title={<LogoutIcon width={20} className={'text-color--light-1 pt-3'}/>}
            onClick={() => signout()}
        />;
    }

    return <Modal
        level={2}
        className={'border-radius-px-5 p-15'}
        content={isRegister
            ? <RegisterForm onClick={() => setIsRegister(false)}/>
            : <LoginForm onClick={() => setIsRegister(true)}/>}
        size={{ sm: 90, md: 72, lg: 50, xl: 40 }}
        header={<h2 className={'header--3 text-align-center'}>{isRegister ? 'Sign up' : 'Sign in'}</h2>}
        wrapperClass={'align-self-center'}
        trigger={<Button
            textColor={'text-color--light-1'}
            buttonStyle={'transparent'}
            title={<LoginIcon width={24} className={'text-color--light-1 pt-3'}/>}
        />}
    />;
};
