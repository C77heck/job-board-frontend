import React from 'react';
import { JobCardProps } from '../AdsListScreen/Components/job-card';

export interface JobAnalyticsProps {
    posts: JobCardProps[];
}

export const JobAnalytics = (props: any) => {
    return <div className={'row w-100 mt-23 line-wrapper background-color--secondary-2'}>
        <div className={'col-20 position-center flex-column'}>
            <span className={'fs-14 color--dark-2 fw--700'}>Viewed</span>
            <span className={'fs-14 color--dark-2 fw--700 pt-8 color-green'}>{props.items.length}</span>
        </div>
        <div className={'col-20 position-center flex-column'}>
            <span className={'fs-14 color--dark-2 fw--700'}>Applied for</span>
            <span className={'fs-14 color--dark-2 fw--700 pt-8 color-green'}>{props.items.length}</span>
        </div>
        <div className={'col-20 position-center flex-column'}>
            <span className={'fs-14 color--dark-2 fw--700'}>Standard</span>
            <span className={'fs-14 color--dark-2 fw--700 pt-8 color-green'}>{props.items.length}</span>
        </div>
        <div className={'col-20 position-center flex-column'}>
            <span className={'fs-14 color--dark-2 fw--700'}>Featured</span>
            <span className={'fs-14 color--dark-2 fw--700 pt-8 color-green'}>{props.items.length}</span>
        </div>
        <div className={'col-20 position-center flex-column'}>
            <span className={'fs-14 color--dark-2 fw--700'}>Premium</span>
            <span className={'fs-14 color--dark-2 fw--700 pt-8 color-green'}>{props.items.length}</span>
        </div>
    </div>;
};
