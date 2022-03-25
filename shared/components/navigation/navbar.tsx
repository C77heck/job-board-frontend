import { useContext, useEffect, useState } from 'react';
import { Portal } from '../portal';
import { AuthContext } from '../../contexts/auth.context';
import { Repository } from '../../libs/repository';
import { DesktopNavbar } from './desktop-navbar';
import { MobileNavbar } from './mobile-navbar';

export const NavBar = (props: any) => {

    const [shouldRefetch, setShouldRefetch] = useState(false);
    const { token, isLoggedIn } = useContext(AuthContext);

    const request = new Repository(token);

    useEffect(() => {
        if (isLoggedIn || !!shouldRefetch) {
            (async () => {
                try {
                    console.log('Pulling the latest data...');
                    // await request.get('/crypto/latest_listings', {});
                    console.log('Pulling the latest data was successful');
                } catch (e) {
                    console.log('Pulling the latest data was unsuccussfull');
                }
            })();
        }
    }, [isLoggedIn, shouldRefetch]);

    useEffect(() => {
        const timer = setInterval(() => setShouldRefetch(!shouldRefetch), 1000 * 60 * 3);
        return () => clearInterval(timer);
    }, [shouldRefetch]);

    return <Portal elementId={'navbar'}>
        <DesktopNavbar className={"display-none display-md-flex"} isLoggedIn={isLoggedIn}/>
        <MobileNavbar className={"display-flex display-md-none"} isLoggedIn={isLoggedIn}/>
    </Portal>;
};
