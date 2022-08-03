import { LogoutIcon } from '../icons/icons';
import { NavLink } from './libs/nav-link';

export const RecruiterDropdown = (props: any) => {
    return <div className={'row'}>
        <NavLink href={'/recruiter/recruiter-profile'}>
            <span className={'col-100 display-block fs-16 pt-5 text-align-left hover-secondary'}>Profile</span>
        </NavLink>
        <NavLink href={'/recruiter/my-jobs'}>
            <span className={'col-100 display-block fs-16 pt-5 text-align-left hover-secondary'}>Jobs</span>
        </NavLink>
        <div className={'col-100 pt-5'}>
            <LogoutIcon onClick={() => props.signoutHandler()} width={20} className={'pt-3 text-align-left hover-secondary'}/>
        </div>
    </div>;
};
