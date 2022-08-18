import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { FilterColumn } from '../components/AdsListScreen/Components/filter-column';
import { JobListings } from '../components/AdsListScreen/Components/job-listings';
import { Paginator } from '../shared/components/paginator/paginator';
import { useClient } from '../shared/hooks/client';
import { BaseLayoutWidth } from '../shared/layouts/base-layout-width';
import { BaseLayout } from '../shared/layouts/base.layout';
import { QueryManager } from '../shared/libs/query.manager';

// TODO -> NEED TO CHECK THE URL FOR FILTERS. MAKE THE OTHER FILTERS THE SAME AND PERHAPS TURN IT INTO BASE64
const AdsList: NextPage = (props: any) => {
    const { client, error } = useClient();
    const [paginatedData, setPaginatedData] = useState({
        items: [],
        limit: 5,
        total: 0,
        page: 0
    });

    const [pagination, setPagination] = useState({
        limit: 5,
        total: 0,
        page: 0
    });

    const [query, setQuery] = useState(null);

    const getJobs = (data: any) => {
        setPaginatedData(data);
    };

    const paginate = (page: number) => {
        setPagination({ ...pagination, page });
    };

    useEffect(() => {
        const query = new QueryManager(window.location.search);
        setQuery(query.decodeBase64());
    }, []);

    const getJobAds = async () => {
        try {
            const response = await client('/ads/get-all-ads', 'GET', {}, query);

            if (!response) {
                throw new Error('Something went wrong');
            }

            setPaginatedData(response);
        } catch (e) {
            console.log(e, error);
        }
    };

    useEffect(() => {
        (async () => await getJobAds())();
    }, []);

    return <BaseLayout auth={false} meta={{ title: 'jobs', keywords: 'jobs', description: 'jobs' }}>
        <BaseLayoutWidth>
            <div className={'row position-center mt-150 mb-50'}>
                <div className={'col-20'}>
                    <FilterColumn passData={(data: any) => getJobs(data)}/>
                </div>
                <div className={'col-80 pl-40'}>
                    <JobListings jobs={paginatedData.items}/>
                    <div className={'pt-80'}>
                        <Paginator
                            total={paginatedData.total}
                            currentPage={paginatedData.page}
                            fetchPage={paginate}
                        />
                    </div>
                </div>
            </div>
        </BaseLayoutWidth>
    </BaseLayout>;
};
export default AdsList;
