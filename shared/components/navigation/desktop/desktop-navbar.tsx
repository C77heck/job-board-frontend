import * as React from 'react';
import { useCallback } from 'react';
import { getLinks } from '../../../config/static-data';
import { Button } from '../../buttons/button';
import { FavouriteIcon, NotificationIcon } from '../../icons/icons';
import { NavLink } from '../libs/nav-link';
import { LoginButton } from '../login.button';
import { RegisterCv } from '../register-cv';
import { RegisterRecruiter } from '../register-recruiter';
import { SearchBar } from './search-bar';

export interface DesktopNavbarProps {
    showSearchBar?: boolean;
}

export const DesktopNavbar = (props: any) => {
    // todo -> need to factor in if the visitor is a job seeker or an employer for links to show.
    const { adEdit, adsList, adView, jobSeekerProfile, employerProfile, favourites, home } = getLinks();

    const checkLocation = useCallback((link: string) => {
        return !(window.location.pathname === link);
    }, []);

    const { isLoggedIn } = props;

    return <nav className={`${props.className} nav-bar flex-column`}>
        <div className={'fix-height-70 background-color--light-1 position-center'}>
            <div className={'row base-layout-width'}>
                <div className={'col-50'}>
                    <NavLink href={'/'}>
                        <h2 className={'fs-40 fw--900 color--secondary-1 hover-opacity'}>Honest jobs</h2>
                    </NavLink>
                </div>
                <div className={'col-50 display-flex justify-content-end'}>
                    <RegisterRecruiter/>
                </div>
            </div>

        </div>
        <div className={'fix-height-40  position-center'}>
            <div className={'row base-layout-width'}>

                <div className={'col-50 position-center'}>
                    <ul className="nav-bar--ul row">
                        {checkLocation(home) && <li className={'mr-28'}>
                            <NavLink href={home}>
                                Home
                            </NavLink>
                        </li>}
                        {checkLocation(adsList) && <li className={'mr-28'}>
                            <NavLink href={adsList}>
                                Jobs
                            </NavLink>
                        </li>}
                        <li className={'mr-28'}>
                            <NavLink href={favourites}>
                                Companies hiring
                            </NavLink>
                        </li>
                        <li className={'mr-28'}>
                            <NavLink href={adsList}>
                                Career advice
                            </NavLink>
                        </li>

                    </ul>
                </div>
                <div className={'col-50 display-flex justify-content-end align-items-center'}>
                    <Button
                        className={'ml-13'}
                        buttonStyle={'transparent'}
                        title={<NotificationIcon width={23} className={`hover-opacity color--light pt-2`}/>}
                        onClick={() => console.log('favourite')}
                    />
                    <div className={'ml-13'}>
                        <NavLink href={favourites}>
                            <FavouriteIcon width={23} className={`hover-opacity color--light`}/>
                        </NavLink>
                    </div>
                    <div className={'ml-13 position-relative'}><LoginButton/></div>
                    <div className={'ml-20'}>{!isLoggedIn && <RegisterCv/>}</div>
                </div>
            </div>

        </div>
        <SearchBar show={props.showSearchBar}/>
    </nav>;
};
