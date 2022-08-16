import { useContext, useEffect } from 'react';
import { SessionContext } from '../../shared/contexts/session.context';
import { Job } from '../AdsListScreen/Components/job-listings';

export interface AdCardProps {
    adId?: string;
    data: Job | null;
}

export const AdCard = (props: AdCardProps) => {
    const { sessionId, sendViewEvent } = useContext(SessionContext);

    useEffect(() => {
        if (sessionId) {
            (async () => await sendViewEvent(sessionId, props.adId as string))();
        }
    }, [sessionId]);
    console.log(props.data);
    if (!props.data) {
        return null;
    }

    return <div className={'w-100'}>
        <span>{props.data.title}</span>
        <span>{props.data.location}</span>
        <span>{props.data.logo}</span>
        <span>{props.data.description}</span>
        <span>{props.data.salary}</span>
    </div>;
};
