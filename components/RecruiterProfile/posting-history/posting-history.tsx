import { useState } from 'react';
import { Paginator } from '../../../shared/components/paginator/paginator';
import { JobAnalytics } from '../job-analytics';
import { FilterLane } from './components/filter-lane';
import { Sort } from './components/sort-header';
import { Listing } from './listing';

export const PostingHistory = () => {
    const [sort, setSort] = useState<Sort | null>(null);
    const [paginatedData, setPaginatedData] = useState({
        items: [],
        limit: 0,
        total: 0,
        page: 0
    });

    const getJobs = (data: any) => {
        setPaginatedData({
            items: data.items,
            limit: data.limit,
            total: data.total,
            page: data.page
        });
    };

    return <div className={'py-50 w-100 px-30 position-center flex-column'}>
        <div className={'max-width-800'}>
            <FilterLane
                pagination={{ limit: paginatedData.limit, page: paginatedData.page }}
                sort={sort}
                passData={(data: any) => getJobs(data)}
            />
            <JobAnalytics items={paginatedData.items}/>
            <Listing onChange={(sort) => setSort(sort)} posts={paginatedData?.items}/>
            <Paginator
                total={paginatedData.total}
                currentPage={paginatedData.page}
                fetchPage={(page: number) => setPaginatedData({ ...paginatedData, page })}
            />
        </div>
    </div>;
};
