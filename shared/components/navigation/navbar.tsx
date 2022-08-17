import { useContext, useEffect } from 'react';
import { AuthContext, UserType } from '../../contexts/auth.context';
import { Portal } from '../portal';
import { DesktopNavbar } from './desktop/desktop-navbar';
import { Analyitics } from './libs/analyitics';
import { MobileNavbar } from './mobile/mobile-navbar';

export interface NavbarProps {
    showSearchBar?: boolean;
}

export const NavBar = (props: any) => {
    const { isLoggedIn, userId, userData, token, type, whoami } = useContext(AuthContext);

    useEffect(() => {
        if (isLoggedIn && userId && !userData) {
            (async () => await whoami(type as UserType))();
        }
    }, [userId]);

    return <Portal elementId={'navbar'}>
        <Analyitics/>
        <DesktopNavbar showSearchBar={props.showSearchBar} className={"display-none display-md-flex"} isLoggedIn={isLoggedIn}/>
        <MobileNavbar showSearchBar={props.showSearchBar} className={"display-flex display-md-none"} isLoggedIn={isLoggedIn}/>
    </Portal>;
};
