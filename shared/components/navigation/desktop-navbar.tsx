import { useCallback } from 'react';
import { staticData } from '../../config/static-data';
import { LoginButton } from './login.button';
import { NavLink } from './nav-link';

export const DesktopNavbar = (props: any) => {
    // todo -> need to factor in if the visitor is a job seeker or an employer for links to show.
    const { links: { adEdit, adsList, adView, jobSeekerProfile, employerProfile, favourites, home } } = staticData;

    const getColor = useCallback((link: string) => {
        const genericClasses = 'text-decoration-none uppercase fs-mlg-17 fs-14 white-space-nowrap py-20 fw--700';
        return window.location.pathname === link
            ? `${genericClasses} text-color--active`
            : `${genericClasses}`;
    }, []);

    const { isLoggedIn } = props;

    return <nav className={`${props.className} nav-bar justify-content-center align-items-center`}>
        <div className={'row max-width-vw-85'}>
            <div className={'col-80 col-lg-60'}>
                <ul className="nav-bar--ul row">
                    <li className={'col-20'}>
                        <NavLink href={home}>
                            Home
                        </NavLink>
                    </li>
                    {isLoggedIn && <li className={'col-20'}>
                        <NavLink href={adEdit}>
                            watchlist
                        </NavLink>
                    </li>}
                    {isLoggedIn && <li className={'col-20'}>
                        <NavLink href={favourites}>
                            Favourites
                        </NavLink>
                    </li>}

                    <li className={'col-20'}>
                        <NavLink href={adsList}>
                            Fluctuation
                        </NavLink>
                    </li>
                    {isLoggedIn && <li className={'col-20'}>
                        <NavLink href={adView}>
                            new purchase
                        </NavLink>
                    </li>}

                </ul>
            </div>
            <div className={'col-20 col-lg-40 display-flex justify-content-end'}>
                <LoginButton/>
            </div>
        </div>
    </nav>;
};
