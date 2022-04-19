import * as React from 'react';
import { useCallback } from 'react';
import { staticData } from '../../config/static-data';
import { Button } from '../buttons/button';
import { FavouriteIcon, LogoutIcon, NotificationIcon } from '../icons/icons';
import { LoginButton } from './login.button';
import { NavLink } from './nav-link';
import { RegisterCv } from './register-cv';

export const DesktopNavbar = (props: any) => {
    // todo -> need to factor in if the visitor is a job seeker or an employer for links to show.
    const { links: { adEdit, adsList, adView, jobSeekerProfile, employerProfile, favourites, home } } = staticData;

    const checkLocation = useCallback((link: string) => {
        return !(window.location.pathname === link);
    }, []);

    const { isLoggedIn } = props;

    return <nav className={`${props.className} nav-bar flex-column`}>
        <div className={'fix-height-70 background-color--light-1 position-center'}>
            <div className={'row base-layout-width'}>
                <div className={'col-50'}>
                    <NavLink href={'/'}>
                        <h2 className={'fs-40 fw--900 text-color--secondary-1 hover-opacity'}>Honest jobs</h2>
                    </NavLink>
                </div>
                <div className={'col-50 display-flex justify-content-end'}>
                    <div className={'display-flex align-items-center'}>
                        <h3 className={'fs-18 fw--700'}>Are you recruiting?</h3>
                        <Button title={'Advertise now'} buttonStyle={'secondary'} className={'ml-20 mt-3'}/>
                    </div>
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
                        textColor={'text-color--light-1'}
                        buttonStyle={'transparent'}
                        title={<NotificationIcon width={23} className={`hover-opacity text-color--light-1 pt-2`}/>}
                        onClick={() => console.log('favourite')}
                    />
                    <div className={'ml-13'}>
                        <NavLink href={favourites}>
                            <FavouriteIcon width={23} className={`hover-opacity text-color--light-1`}/>
                        </NavLink>
                    </div>
                    <div className={'ml-13'}><LoginButton/></div>
                    <div className={'ml-20'}><RegisterCv/></div>
                </div>
            </div>

        </div>
    </nav>;
};
