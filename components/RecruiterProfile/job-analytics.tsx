import React, { useEffect, useState } from 'react';
import { JobCardProps } from '../AdsListScreen/Components/job-card';
import { Job } from '../AdsListScreen/Components/job-listings';

export interface JobAnalyticsProps {
    items: JobCardProps[];
}

export const JobAnalytics = (props: JobAnalyticsProps) => {
    const [analytics, setAnalytics] = useState({
        viewed: 0,
        appliedFor: 0,
        standard: 0,
        featured: 0,
        premium: 0,
    });

    const extractAnalytics = () => {
        if (!props.items || !props.items.length) {
            return;
        }

        const properties = ['viewed', 'appliedFor', 'standard', 'featured', 'premium'];
        const result: any = {};

        for (const item of props.items) {
            for (const prop of properties) {
                result[prop] += item?.analytics?.[prop as keyof Job['analytics']] || 0;
            }
        }
        console.log(result);
        setAnalytics(result);
    };

    useEffect(() => {
        extractAnalytics();
    }, [props.items]);

    const normalizeVAlue = (value: string | number) => {
        if (!value) {
            return 0;
        }

        return value;
    };

    return <div className={'row w-100 mt-23 line-wrapper background-color--yellow-light'}>
        <div className={'col-20 position-center flex-column'}>
            <span className={'fs-14 color--dark-2 fw--700'}>Viewed</span>
            <span className={'fs-14 color--dark-2 fw--700 pt-8 color-green'}>{normalizeVAlue(analytics.viewed)}</span>
        </div>
        <div className={'col-20 position-center flex-column'}>
            <span className={'fs-14 color--dark-2 fw--700'}>Applied for</span>
            <span className={'fs-14 color--dark-2 fw--700 pt-8 color-green'}>{normalizeVAlue(analytics.appliedFor)}</span>
        </div>
        <div className={'col-20 position-center flex-column'}>
            <span className={'fs-14 color--dark-2 fw--700'}>Standard</span>
            <span className={'fs-14 color--dark-2 fw--700 pt-8 color-green'}>{normalizeVAlue(analytics.standard)}</span>
        </div>
        <div className={'col-20 position-center flex-column'}>
            <span className={'fs-14 color--dark-2 fw--700'}>Featured</span>
            <span className={'fs-14 color--dark-2 fw--700 pt-8 color-green'}>{normalizeVAlue(analytics.featured)}</span>
        </div>
        <div className={'col-20 position-center flex-column'}>
            <span className={'fs-14 color--dark-2 fw--700'}>Premium</span>
            <span className={'fs-14 color--dark-2 fw--700 pt-8 color-green'}>{normalizeVAlue(analytics.premium)}</span>
        </div>
    </div>;
};
