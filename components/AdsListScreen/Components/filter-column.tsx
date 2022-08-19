import { useEffect, useState } from 'react';
import { Spinner } from '../../../shared/components/spinner/spinner';
import { useClient } from '../../../shared/hooks/client';
import { FilterButtons } from './filter-buttons';
import { Filters } from './filters';

const dummyLocationFilters = [
    { id: '1', title: 'London', items: 3 },
    { id: '2', title: 'Brighton', items: 5 },
    { id: '3', title: 'Sussex', items: 323 },
    { id: '4', title: 'East coast', items: 12 },
    { id: '5', title: 'West-midlands', items: 43 },
    { id: '6', title: 'South-midlands', items: 54 },
    { id: '7', title: 'Glasgow', items: 1 },
];

export interface FilterColumnProps {
    passData: (data: any) => void;
}

export const FilterColumn = (props: FilterColumnProps) => {
    const { client, error, isLoading } = useClient();
    const [filterOptions, setFilterOptions] = useState({
        location: [],
        companyType: [],
        postedAt: [],
        relatedRoles: [],
    });
    const getFilterOptions = async () => {
        try {
            const filterOptions = await client('/ads/ad-filters');

            setFilterOptions(filterOptions);
        } catch (e) {
            console.log(e);
        }
    };

    // const url = new URL(window.location);
    // url.searchParams.set('key', value);
    // window.history.pushState(null, '', url.toString());

    useEffect(() => {
        (async () => await getFilterOptions())();
    }, []);

    return <div className={'display-flex flex-column'}>
        <Spinner isLoading={isLoading}/>
        <Filters title={'Location'} filters={filterOptions?.location}/>
        <Filters className={'mt-15'} title={'Type of Company'} filters={filterOptions?.companyType}/>
        <Filters className={'mt-15'} title={'Date posted'} filters={filterOptions?.postedAt}/>
        <FilterButtons title={'Related roles'} filters={filterOptions?.relatedRoles}/>
    </div>;
};
