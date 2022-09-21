import Link from 'next/link';
import { useCallback } from 'react';
import { getLinks } from '../../../config/static-data';

export const MobileLinks = (props: any) => {
    const { adEdit, adsList, adView, jobSeekerProfile, employerProfile, favourites, home } = getLinks();

    const getColor = useCallback((link: string) => {
        const genericClasses = 'text-decoration-none uppercase fs-21 white-space-nowrap py-20 fw--700';
        return window.location.pathname === link
            ? `${genericClasses} color--secondary-2`
            : `${genericClasses}`;
    }, []);

    const { isLoggedIn } = props;

    const isShow = props.show ? 'opened' : '';

    return <div className={`mobile-overlay w-100 mobile-menu ${isShow}`}>
        <div
            className={`mobile-overlay__left pt-50 display-flex background-color--light-2 flex-column align-items-baseline mobile-menu ${isShow}`}
        >
            <div className="display-flex display-md-none  align-items-start flex-column pl-20">
                <Link href={home}>
                    Home
                </Link>
                {isLoggedIn && <Link href={adEdit}>
                    watchlist
                </Link>}
                {isLoggedIn && <Link href={adsList}>
                    new purchase
                </Link>}
                <Link href={adView}>
                    Fluctuation
                </Link>
                {isLoggedIn && <Link href={favourites}>
                    Favourites
                </Link>}
            </div>
        </div>
        <div
            onClick={props.onClick}
            className={`mobile-overlay__right display-flex display-md-none background-color--dark-2 flex-column mobile-opacity ${isShow}`}
        />
    </div>;
};
