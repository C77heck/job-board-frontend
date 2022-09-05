import React, { useContext, useEffect } from 'react';
import { Hr } from '../../shared/components/ui-misc/hr';
import { SessionContext } from '../../shared/contexts/session.context';
import { Job } from '../AdsListScreen/Components/job-listings';
import { ActionButtons } from './action-buttons';
import { AdDetails } from './ad-details';

export interface AdCardProps {
    adId?: string;
    data: Job | null;
    isLoading?: boolean;
}

export const AdCard = (props: AdCardProps) => {
    const { sessionId, sendViewEvent } = useContext(SessionContext);

    useEffect(() => {
        if (sessionId) {
            (async () => await sendViewEvent(sessionId, props.adId as string))();
        }
    }, [sessionId]);

    if (!props.data) {
        return null;
    }

    return <div className={'w-100 position-center ad-view-wrapper'}>
        <div className={'w-80'}>
            <div className={'w-100'}>
                <h1 className={''}>{props.data.title}</h1>
            </div>
            <AdDetails {...props} />
            <Hr className={'my-30'}/>
            <div className={'w-100 position-center flex-column'}>
                <ActionButtons/>
                <div className={'w-80 py-30'}>
                    <span>{props.data.description}</span>
                </div>
                <ActionButtons/>
            </div>
        </div>
    </div>;
};
