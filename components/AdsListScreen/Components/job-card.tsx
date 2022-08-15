import moment from 'moment';
import React from 'react';
import { Button } from '../../../shared/components/buttons/button';
import { CalendarIcon, FavouriteIcon, LocationIcon, MoneyIcon } from '../../../shared/components/icons/icons';
import { NavLink } from '../../../shared/components/navigation/libs/nav-link';
import { formatLongText } from '../../../shared/libs/helpers';
import { CompanyLogo } from './company-logo';
import { Job } from './job-listings';

export interface JobCardProps extends Job {
    className?: string;
    submit?: (data: any) => Promise<void>;
    client?: any;
    endpoint?: string;
    method?: string;
}

export const JobCard = (props: JobCardProps) => {
    const { title, expiresOn, description, location, salary, className, logo } = props;
    const actionButton = <Button title={<FavouriteIcon width={25} className={'text-color--dark hover-secondary'}/>} buttonStyle={'transparent'}/>;

    const { formattedText, isFormatted } = formatLongText(description, 420);
    const href = `/ad-view?ad=${props.id}`;

    return <div className={`${className} row pb-8 job-board pt-19 pb-28 px-20`}>
        <div className={'col-11'}>
            <CompanyLogo src={logo}/>
        </div>
        <div className={'col-89 display-flex flex-column'}>
            <div className={'display-flex justify-content-space-between'}>
                <NavLink href={href}><h2 className={'fs-19 fw--700 pb-3 text-color--secondary-1 hover-opacity'}>{title}</h2></NavLink>
                {actionButton}
            </div>
            <div className={'display-flex pb-8'}>
                <div className={'display-flex'}>
                    <MoneyIcon className={'display-flex align-items-center'} width={20}/>
                    <h2 className={'fs-17 fw--700 pl-8 text-color--yellow'}>{salary}</h2>
                </div>
                <div className={'display-flex pl-8'}>
                    <LocationIcon className={'display-flex align-items-center justify-content-start pt-1'} width={19}/>
                    <p className={'fs-15 fw--500 pl-8 text-color--yellow'}>{location}</p>
                </div>
            </div>
            <div className={'display-flex'}>
                <CalendarIcon className={'display-flex align-items-center'} width={16}/>
                <h2 className={'fs-15 fw--400 pl-8 text-color--yellow'}>{moment(expiresOn).format('YYYY.MM.DD.')}</h2>
            </div>
            <div className={'display-flex'}>
                <p className={'fs-13 fw--400 pt-16'}>
                    {formattedText}
                    {isFormatted && <NavLink href={href}><span className={'fs-13 fw--400 pt-16 hover-opacity text-color--secondary-1'}>See more</span></NavLink>}
                </p>
            </div>
        </div>
    </div>;
};
