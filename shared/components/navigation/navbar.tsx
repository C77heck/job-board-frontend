import { useContext, useEffect, useState } from 'react';
import { Portal } from '../portal';
import { AuthContext } from '../../contexts/auth.context';
import { Repository } from '../../libs/repository';
import { DesktopNavbar } from './desktop-navbar';
import { MobileNavbar } from './mobile-navbar';

export const NavBar = (props: any) => {
    const { token, isLoggedIn } = useContext(AuthContext);
    const request = new Repository(token);
    console.log(request, token, isLoggedIn);

    return <Portal elementId={'navbar'}>
        <DesktopNavbar className={"display-none display-md-flex"} isLoggedIn={isLoggedIn}/>
        <MobileNavbar className={"display-flex display-md-none"} isLoggedIn={isLoggedIn}/>
    </Portal>;
};
