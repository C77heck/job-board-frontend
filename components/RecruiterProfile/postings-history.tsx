import { useEffect, useState } from 'react';
import { Paginator } from '../../shared/components/paginator/paginator';
import { useClient } from '../../shared/hooks/client';
import { JobListings } from '../AdsListScreen/Components/job-listings';
import { JobAnalytics } from './job-analytics';
import { JobFilters } from './job-filters';

export const PostingsHistory = () => {
    const [jobs, setJobs] = useState([]);
    const { client } = useClient();
    const [pagination, setPagination] = useState({
        limit: 0,
        total: 0,
        page: 0
    });

    const fetchJobs = async () => {
        try {
            const response = await client('/users/recruiter/get-ads', 'GET', undefined, { pagination });

            if (!response || !response?.items) {
                throw new Error('SomethingWentWrong');
            }

            setJobs(response.items);
            setPagination({
                limit: response.limit,
                total: response.total,
                page: response.page
            });

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
            total={pagination.total}
            currentPage={pagination.page}
            fetchPage={(page: number) => setPagination({ ...pagination, page })}
        />
    </div>;
};
