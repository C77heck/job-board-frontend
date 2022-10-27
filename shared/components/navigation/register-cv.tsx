import * as React from 'react';
import { Button } from '../buttons/button';
import { NavLink } from './libs/nav-link';

export const RegisterCv = (props: any) => {
    return <NavLink href={'/job-seeker/registration'}>
        <Button
            buttonStyle={'primary'}
            className={'background-color--yellow'}
        >
            <span className={'fs-15 color--light letter-spacing-2'}>Register CV</span>
        </Button>
    </NavLink>;
};
