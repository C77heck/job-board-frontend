import moment from 'moment';
import React from 'react';
import { formatLongText } from '../../../../shared/libs/helpers';
import { JobCardProps } from '../../../AdsListScreen/Components/job-card';
import { JobEditModal } from '../../../AdsListScreen/Components/job-edit.modal';

export const Post = (props: JobCardProps) => {
    const { title, expiresOn, description, location, salary, className, editable, logo } = props;
    const { formattedText } = formatLongText(description, 50);
    //  TODO -> DONT FORGET THE MOBILE DESIGN.
    return <div className={'row line-wrapper'}>
        <div className={'col-18 position-center'}>
            <h2 className={'fs-15 fw--500'}>{title}</h2>
        </div>
        <div className={'col-17 position-center'}>
            <h2 className={'fs-15 fw--500'}>{salary}</h2>
        </div>
        <div className={'col-16 position-center'}>
            <p className={'fs-15 fw--500'}>{location}</p>
        </div>
        <div className={'col-17 position-center'}>
            <h2 className={'fs-15 fw--400'}>{moment(expiresOn).format('YYYY.MM.DD.')}</h2>
        </div>
        <div className={'col-16 position-center'}>
            <p className={'fs-15 fw--5000'}>{formattedText}</p>
        </div>
        <div className={'col-16 position-center'}>
            <JobEditModal {...props}/>
        </div>
    </div>;
};
