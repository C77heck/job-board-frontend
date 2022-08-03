import { getLinks } from '../../../config/static-data';
import { Button } from '../../buttons/button';
import { FacebookIcon, InstagramIcon, LinkedInIcon, TwitterIcon } from '../../icons/icons';
import { NavLink } from '../libs/nav-link';

export const Footer = (props: any) => {
    const { adEdit, adsList, adView, jobSeekerProfile, employerProfile, favourites, home } = getLinks();

    return <footer className={'display-flex flex-column'}>
        <div className={'footer display-flex justify-content-center p-40'}>
            <div className={'col-20 display-flex flex-column'}>
                <h3 className={'fs-17 fw--700 pb-10'}>Honest jobs</h3>
                <NavLink href={'/'}><span className={'fs-13 fw--400 pb-3 hover-primary'}>About us</span></NavLink>
                <NavLink href={'/'}><span className={'fs-13 fw--400 pb-3 hover-primary'}>Privacy policy</span></NavLink>
                <NavLink href={'/'}><span className={'fs-13 fw--400 pb-3 hover-primary'}>Terms and Conditions</span></NavLink>
                <NavLink href={'/'}><span className={'fs-13 fw--400 pb-3 hover-primary'}>Cookies</span></NavLink>
            </div>
            <div className={'col-20 display-flex flex-column'}>
                <h3 className={'fs-17 fw--700 pb-10'}>Recruiter</h3>
                <NavLink href={'/'}><span className={'fs-13 fw--400 pb-3 hover-primary'}>Advertise a job</span></NavLink>
                <NavLink href={'/'}><span className={'fs-13 fw--400 pb-3 hover-primary'}>Contact us</span></NavLink>
                <NavLink href={'/'}><span className={'fs-13 fw--400 pb-3 hover-primary'}></span></NavLink>
            </div>

            <div className={'col-20 display-flex flex-column'}>
                <h3 className={'fs-17 fw--700 pb-10'}>Job seeker</h3>
                <NavLink href={'/'}><span className={'fs-13 fw--400 pb-3 hover-primary'}>Salary checker</span></NavLink>
                <NavLink href={'/'}><span className={'fs-13 fw--400 pb-3 hover-primary'}>Salary planner</span></NavLink>
                <NavLink href={'/'}><span className={'fs-13 fw--400 pb-3 hover-primary'}>Submit a company review</span></NavLink>
            </div>
        </div>

        <div className={'w-100 position-center h-px-45 mt-6'}>
            <Button className={'ml-15 position-center'} title={<InstagramIcon width={26}/>} buttonStyle={'transparent'}/>
            <Button className={'ml-15 position-center hover-twitter'} title={<TwitterIcon width={26}/>} buttonStyle={'transparent'}/>
            <Button className={'ml-15 position-center hover-linkedin'} title={<LinkedInIcon width={26}/>} buttonStyle={'transparent'}/>
            <Button className={'ml-15 position-center hover-facebook'} title={<FacebookIcon width={26}/>} buttonStyle={'transparent'}/>
        </div>
        <div className={'w-100 position-center footer'}>
            <p className={'fs-12 fw--400 text-color--light-1'}>
                © Copyright and database rights Honest jobs Group Ltd 2022
            </p>
        </div>
    </footer>;
};
