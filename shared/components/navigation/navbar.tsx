import { useContext } from 'react';
import { AuthContext } from '../../contexts/auth.context';
import { Portal } from '../portal';
import { DesktopNavbar } from './desktop/desktop-navbar';
import { MobileNavbar } from './mobile/mobile-navbar';

export const NavBar = (props: any) => {
    const { isLoggedIn } = useContext(AuthContext);

    return <Portal elementId={'navbar'}>
        <DesktopNavbar className={"display-none display-md-flex"} isLoggedIn={isLoggedIn}/>
        <MobileNavbar className={"display-flex display-md-none"} isLoggedIn={isLoggedIn}/>
    </Portal>;
};
