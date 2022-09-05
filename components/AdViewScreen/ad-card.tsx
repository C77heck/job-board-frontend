import { useContext, useEffect } from 'react';
import { SessionContext } from '../../shared/contexts/session.context';
import { BaseLayoutWidth } from '../../shared/layouts/base-layout-width';
import { BaseLayout } from '../../shared/layouts/base.layout';
import { Job } from '../AdsListScreen/Components/job-listings';

export interface AdCardProps {
    adId?: string;
    data: Job | null;
    isLoading?: boolean;
}

// TODO -> SEARCH BAR FOR THE NAVBAR probably just stuck one on top and show only if on this page.
// BACK BUTTON AND OR NEXT ON THE RIGHT
// THE CARD: TITLE, DETAILS WITH ICONS
// ACTION BUTTONS BOTH HERE AND ON THE BOTTOM OF THE CARD
// ALERT CREATION, APPLY, EDIT APPLICATION, SAVE
// RELATED JOBS LINE ON THE BOTTOM
// SHARE POSSIBILITIES.

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

    return <BaseLayout
        showSearchBar={true}
        isLoading={props.isLoading}
        auth={false}
        meta={{ title: 'jobs', keywords: 'jobs', description: 'jobs' }}
    >
        <BaseLayoutWidth>
            <div className={'w-100'}>
                <span>{props.data.title}</span>
                <span>{props.data.location}</span>
                <span>{props.data.logo}</span>
                <span>{props.data.description}</span>
                <span>{props.data.salary}</span>
            </div>
            ;
        </BaseLayoutWidth>
    </BaseLayout>;
};
