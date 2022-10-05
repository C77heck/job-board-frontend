import { NextPage } from 'next';
import { useContext, useEffect, useState } from 'react';
import { FilterColumn } from '../components/AdsListScreen/Components/filter-column';
import { JobListings } from '../components/AdsListScreen/Components/job-listings';
import { UrlListener } from '../shared/components/navigation/libs/url-listener';
import { Paginator } from '../shared/components/paginator/paginator';
import { AuthContext } from '../shared/contexts/auth.context';
import { useClient } from '../shared/hooks/client';
import { useUrlManagerHook } from '../shared/hooks/url-manager-hook';
import { BaseLayoutWidth } from '../shared/layouts/base-layout-width';
import { BaseLayout } from '../shared/layouts/base.layout';
import { handleErrors } from '../shared/libs/handle-errors';
import { extractFilters } from '../shared/libs/helpers';
import { QueryManager } from '../shared/libs/query.manager';

const AdsList: NextPage = (props: any) => {
    const { client, error, isLoading } = useClient();
    const { addMultiple } = useUrlManagerHook();
    const { isLoggedIn, token, role } = useContext(AuthContext);

    console.log({ token, isLoggedIn, role });

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
            const query = QueryManager.decodeBase64(window.location.search);
            const filters = extractFilters(query);
            const response = await client('/ads', 'GET', {}, { pagination, filters });

            if (!response) {
                throw new Error('Something went wrong');
            }

            setPaginatedData(response);
        } catch (e) {
            handleErrors(e, error);
        }
    };

    return <BaseLayout showSearchBar={true} isLoading={isLoading} auth={false} meta={{ title: 'jobs', keywords: 'jobs', description: 'jobs' }}>
        <BaseLayoutWidth>
            <UrlListener urlChanged={() => getJobAds()}/>
            <div className={'row display-flex justify-content-center align-items-start mt-220 mb-50'}>
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
