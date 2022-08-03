import * as React from 'react';
import { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/auth.context';
import { Button } from '../buttons/button';
import { LoginIcon } from '../icons/icons';
import { EmployeeDropdown } from './employee-dropdown';
import { ProfileDropdown } from './libs/profile-dropdown';
import { LoginTypeDropdown } from './login-type.dropdown';
import { RecruiterDropdown } from './recruiter-dropdown';

export const LoginButton = ({ isMobile }: any) => {
    const { signout, isLoggedIn, type } = useContext(AuthContext);
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
                content={type === 'job-seeker' ? <EmployeeDropdown signoutHandler={signoutHandler}/> : <RecruiterDropdown signoutHandler={signoutHandler}/>}
            />}
            onClick={() => console.log('signout pressed')}
        />;
    }

    return <LoginTypeDropdown/>;
};
