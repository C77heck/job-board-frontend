import { useEffect, useState } from 'react';
import { useClient } from '../../shared/hooks/client';
import { handleErrors } from '../../shared/libs/handle-errors';
import { SmallAdCard } from './small-ad-card';

const dummyFilters = [
    { id: '1', title: 'Full time', property: 'Full time' },
    { id: '2', title: 'Part time', property: 'part-time' },
    { id: '3', title: 'Popular searches', property: 'Popular searches' },
    { id: '4', title: 'Entry level jobs', property: 'Entry level jobs' },
    { id: '5', title: 'Jobs by location', property: 'Jobs by location' },
    { id: '6', title: 'Jobs by company', property: 'Jobs by company' },
];

export const SimilarAds = (props: { adId?: string; }) => {
    const [items, setItems] = useState([]);
    const { client, error, isLoading } = useClient();

    const getJobAds = async () => {
        try {
            if (!props.adId) {
                return;
            }

            const response = await client(`/ads/similar-ads/${props.adId}`, 'GET');

            if (!response || !response?.items) {
                throw new Error('Something went wrong');
            }

            setItems(response.items);
        } catch (e) {
            handleErrors(e, error);
        }
    };

    useEffect(() => {
        (async () => await getJobAds())();
    }, [props.adId]);

    // todo -> should like 6 or 8 depends need another card
    return <div className={'row py-40 justify-content-space-between'}>
        {(items || dummyFilters).map((data: any) => <div key={data.id} className={'col-32 mb-18'}><SmallAdCard {...data} /></div>)}
    </div>;
};
