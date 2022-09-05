import React from 'react';
import { BusinessIcon, CalendarIcon, JobTypeIcon, LocationIcon, MoneyIcon } from '../../shared/components/icons/icons';
import { NavLink } from '../../shared/components/navigation/libs/nav-link';
import { priceFormat } from '../../shared/libs/helpers';
import { CompanyLogo } from '../AdsListScreen/Components/company-logo';

// todo -> the company name to be clickable and should take to its profile with all available jobs there
// turn the thingy into a linke
export const AdDetails = (props: any) => {

    return <div className={'row'}>
        <div className={'col-70'}>
            <div className={'display-flex justify-content-start align-items-center'}>
                <LocationIcon className={'pr-10'} width={20}/>
                <span className={'fs-19'}>{props.data.location}</span>
            </div>
            <div className={'display-flex justify-content-start align-items-center'}>
                <MoneyIcon className={'pr-10'} width={20}/>
                <span className={'fs-19'}>{priceFormat(props.data.salary)}</span>
            </div>
            <div className={'display-flex justify-content-start align-items-center'}>
                <BusinessIcon className={'pr-10'} width={20}/>
                <NavLink href={'/recruiter/:recruiterId'}> <span className={'fs-19 hover-secondary'}>company name</span></NavLink>
            </div>
            <div className={'display-flex justify-content-start align-items-center'}>
                <JobTypeIcon className={'pr-10'} width={20}/>
                <span className={'fs-19'}>job type permament </span>
            </div>
            <div className={'display-flex justify-content-start align-items-center'}>
                <CalendarIcon className={'pr-10'} width={20}/>
                <span className={'fs-19'}>posted how long</span>
            </div>
        </div>
        <div className={'col-30 position-center'}>
            <CompanyLogo className={'w-px-140 h-px-140'} src={props.data.logo}/>
        </div>
    </div>;
};
