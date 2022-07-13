import { useEffect, useState } from 'react';
import { useClient } from '../../shared/hooks/client';
import { JobListings } from '../AdsListScreen/Components/job-listings';

export const PostingsHistory = () => {
    const [jobs, setJobs] = useState([]);
    const { client } = useClient();

    const fetchJobs = async () => {
        try {
            const response = await client('/ads/get-ads-by-employer');

            if (!response || !response?.items) {
                throw new Error('SomethingWentWrong');
            }

            setJobs(response.items);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        (async () => await fetchJobs())();
    }, []);

    return <div className={'py-50 w-100 px-30'}>
        <JobListings editable={true} jobs={jobs}/>
    </div>;
};
