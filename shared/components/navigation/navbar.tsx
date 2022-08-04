import { useContext, useEffect } from 'react';
import { AuthContext, UserType } from '../../contexts/auth.context';
import { Portal } from '../portal';
import { DesktopNavbar } from './desktop/desktop-navbar';
import { MobileNavbar } from './mobile/mobile-navbar';

export const NavBar = (props: any) => {
    const { isLoggedIn, userId, userData, token, type, whoami } = useContext(AuthContext);

    useEffect(() => {
        if (isLoggedIn && userId && !userData) {
            (async () => await whoami(type as UserType))();
        }
    }, [userId]);

    return <Portal elementId={'navbar'}>
        <DesktopNavbar className={"display-none display-md-flex"} isLoggedIn={isLoggedIn}/>
        <MobileNavbar className={"display-flex display-md-none"} isLoggedIn={isLoggedIn}/>
    </Portal>;
};
