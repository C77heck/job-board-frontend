import { useEffect, useState } from 'react';
import { Paginator } from '../../shared/components/paginator/paginator';
import { useClient } from '../../shared/hooks/client';
import { JobListings } from '../AdsListScreen/Components/job-listings';
import { JobAnalytics } from './job-analytics';
import { JobFilters } from './job-filters';

export const PostingsHistory = () => {
    const [jobs, setJobs] = useState([]);
    const { client } = useClient();
    const [paginator, setPaginator] = useState({
        limit: 0,
        total: 0,
        page: 0
    });

    const fetchJobs = async () => {
        try {
            const response = await client('/users/recruiter/get-ads', 'GET', undefined, { paginator });

            if (!response || !response?.items) {
                throw new Error('SomethingWentWrong');
            }

            setJobs(response.items);
            setPaginator(response.paginator);

        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        (async () => await fetchJobs())();
    }, []);
    // TODO WILL NEED NEW JOB CARD THAT WILL DISPLAY POSTED DATE , APPLIED FOR AND VIEWED.
    // TODO MAKE IT A CONJOINED COMPONENT WITH THE NEW CARDS
    // TOOD We will need a frontend paginator too that can be moved around the application
    return <div className={'py-50 w-100 px-30 position-center flex-column'}>
        <JobFilters/>
        <JobAnalytics/>
        <JobListings editable={true} jobs={jobs}/>
        <Paginator
            total={paginator.total}
            currentPage={paginator.page}
            fetchPage={(page: number) => setPaginator({ ...paginator, page })}
        />
    </div>;
};
