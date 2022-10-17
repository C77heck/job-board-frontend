import * as React from 'react';
import { useAuthContext } from '../../hooks/context-hooks/auth-context.hook';
import { Button } from '../buttons/button';
import { NavLink } from './libs/nav-link';

export const RegisterRecruiter = (props: any) => {
    const { isLoggedIn } = useAuthContext();

    if (isLoggedIn) {
        return null;
    }

    return <div className={'row justify-content-end'}>
        <div className={'col-60 display-flex justify-content-end align-items-center'}>
            <h3 className={'fs-18 fw--700'}>Are you recruiting?</h3>
        </div>
        <div className={'col-30 display-flex justify-content-end align-items-center'}>
            <NavLink href={'/recruiter-registration'}>
                <Button buttonStyle={'secondary'} className={'ml-20 mt-3'}>
                    <span className={'fs-15 color--light letter-spacing-2'}>Advertise now</span>
                </Button>
            </NavLink>
        </div>
    </div>;
};
