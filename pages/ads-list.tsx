import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { FilterColumn } from '../components/AdsListScreen/Components/filter-column';
import { JobListings } from '../components/AdsListScreen/Components/job-listings';
import { UrlListener } from '../shared/components/navigation/libs/url-listener';
import { Paginator } from '../shared/components/paginator/paginator';
import { useClient } from '../shared/hooks/client';
import { useUrlManagerHook } from '../shared/hooks/url-manager-hook';
import { BaseLayoutWidth } from '../shared/layouts/base-layout-width';
import { BaseLayout } from '../shared/layouts/base.layout';
import { QueryManager } from '../shared/libs/query.manager';
// TODO -> NEED TO CHECK THE URL FOR FILTERS. MAKE THE OTHER FILTERS THE SAME AND PERHAPS TURN IT INTO BASE64
const AdsList: NextPage = (props: any) => {
    const { client, error, isLoading } = useClient();
    const { addMultiple } = useUrlManagerHook();

    const [paginatedData, setPaginatedData] = useState({
        items: [],
        limit: 6,
        total: 0,
        page: 0
    });

    const [pagination, setPagination] = useState({
        limit: 6,
        total: 0,
        page: 0
    });

    useEffect(() => {
        addMultiple(pagination);
    }, [pagination]);

    const getJobAds = async () => {
        try {
            const filters = QueryManager.decodeBase64(window.location.search);

            const response = await client('/ads', 'GET', {}, { filters, pagination });

            if (!response) {
                throw new Error('Something went wrong');
            }

            setPaginatedData(response);
        } catch (e) {
            console.log(e, error);
        }
    };

    return <BaseLayout isLoading={isLoading} auth={false} meta={{ title: 'jobs', keywords: 'jobs', description: 'jobs' }}>
        <BaseLayoutWidth>
            <UrlListener urlChanged={() => getJobAds()}/>
            <div className={'row display-flex justify-content-center align-items-start mt-150 mb-50'}>
                <div className={'col-20'}>
                    <FilterColumn passData={(data: any) => setPaginatedData(data)}/>
                </div>
                <div className={'col-80 pl-40 h-100'}>
                    <JobListings jobs={paginatedData.items}/>
                </div>
                <div className={'col-20'}/>
                <div className={'col-80'}>
                    <div className={'pt-30'}>
                        <Paginator
                            total={paginatedData.total}
                            currentPage={paginatedData.page}
                            pageChange={(page) => setPagination({ ...pagination, page })}
                        />
                    </div>
                </div>
            </div>
        </BaseLayoutWidth>
    </BaseLayout>;
};

export default AdsList;
