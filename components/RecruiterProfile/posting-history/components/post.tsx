import moment from 'moment';
import React from 'react';
import { CalendarIcon, LocationIcon, MoneyIcon } from '../../../../shared/components/icons/icons';
import { formatLongText } from '../../../../shared/libs/helpers';
import { JobCardProps } from '../../../AdsListScreen/Components/job-card';
import { JobEditModal } from '../../../AdsListScreen/Components/job-edit.modal';

export const Post = (props: JobCardProps) => {
    const { title, expiresOn, description, location, salary, className, editable, logo } = props;
    const { formattedText } = formatLongText(description, 50);
    //  TODO -> DONT FORGET THE MOBILE DESIGN.
    return <div className={'row'}>
        <div className={'col-16'}>
            <h2 className={'fs-19 fw--700 pb-3 text-color--secondary-1 hover-opacity'}>{title}</h2>
        </div>
        <div className={'col-16'}>
            <MoneyIcon className={'display-flex align-items-center'} width={20}/>
            <h2 className={'fs-17 fw--700 pl-8 text-color--yellow'}>{salary}</h2>
        </div>
        <div className={'col-16'}>
            <LocationIcon className={'display-flex align-items-center justify-content-start pt-1'} width={19}/>
            <p className={'fs-15 fw--500 pl-8 text-color--yellow'}>{location}</p>
        </div>
        <div className={'col-16'}>
            <CalendarIcon className={'display-flex align-items-center'} width={16}/>
            <h2 className={'fs-15 fw--400 pl-8 text-color--yellow'}>{moment(expiresOn).format('YYYY.MM.DD.')}</h2>
        </div>
        <div className={'col-16'}>
            <p className={'fs-13 fw--400 pt-16'}>{formattedText}</p>
        </div>
        <div className={'col-16'}>
            <JobEditModal {...props}/>
        </div>
    </div>;
};
