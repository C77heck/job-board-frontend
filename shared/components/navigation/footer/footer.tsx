import { staticData } from '../../../config/static-data';
import { NavLink } from '../nav-link';

export const Footer = (props: any) => {
    const { links: { adEdit, adsList, adView, jobSeekerProfile, employerProfile, favourites, home } } = staticData;

    return <footer className={'footer display-flex justify-content-space-around'}>
        <div className={'col-30'}>
            <h3 className={'fs-17 fw--700'}>JobSeeker</h3>
            <NavLink href={'/'}>adEdit</NavLink>
            <NavLink href={'/'}>adEdit</NavLink>
            <NavLink href={'/'}>adEdit</NavLink>
        </div>
        <div className={'col-30'}>
            <h3 className={'fs-17 fw--700'}>Recruiter</h3>

            <NavLink href={'/'}>adEdit</NavLink>
            <NavLink href={'/'}>adEdit</NavLink>
            <NavLink href={'/'}>adEdit</NavLink>
        </div>
        <div className={'col-30'}>
            <h3 className={'fs-17 fw--700'}>Job board</h3>
            <NavLink href={'/'}>adEdit</NavLink>
            <NavLink href={'/'}>adEdit</NavLink>
            <NavLink href={'/'}>adEdit</NavLink>
        </div>
    </footer>;
};
