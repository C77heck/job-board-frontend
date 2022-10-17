import { useEffect } from 'react';
import { UserType } from '../../contexts/auth.context';
import { useAuthContext } from '../../hooks/context-hooks/auth-context.hook';
import { Portal } from '../portal';
import { DesktopNavbar } from './desktop/desktop-navbar';
import { Analyitics } from './libs/analyitics';
import { MobileNavbar } from './mobile/mobile-navbar';

export interface NavbarProps {
    showSearchBar?: boolean;
}

export const NavBar = (props: any) => {
    const { isLoggedIn, userId, userData, token, role, whoami } = useAuthContext();

    useEffect(() => {
        if (isLoggedIn && userId && !userData) {
            (async () => await whoami(role as UserType))();
        }
    }, [userId]);

    return <Portal elementId={'navbar'}>
        <Analyitics/>
        <DesktopNavbar showSearchBar={props.showSearchBar} className={"display-none display-md-flex"} isLoggedIn={isLoggedIn}/>
        <MobileNavbar showSearchBar={props.showSearchBar} className={"display-flex display-md-none"} isLoggedIn={isLoggedIn}/>
    </Portal>;
};
