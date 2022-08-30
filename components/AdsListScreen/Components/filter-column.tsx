import { useEffect, useState } from 'react';
import { Spinner } from '../../../shared/components/spinner/spinner';
import { useClient } from '../../../shared/hooks/client';
import { FilterButtons } from './filter-buttons';
import { Filters } from './filters';

export interface FilterColumnProps {
    passData?: (data: any) => void;
}

export const FilterColumn = (props: FilterColumnProps) => {
    const { client, error, isLoading } = useClient();
    const [filterOptions, setFilterOptions] = useState({
        location: [],
        companyType: [],
        postedAt: [],
        relatedRoles: [],
        jobType: [],
        industryType: [],
    });
    const getFilterOptions = async () => {
        try {
            const filterOptions = await client('/ads/ad-filters');
            console.log({ filterOptions });
            setFilterOptions(filterOptions.filter);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        (async () => await getFilterOptions())();
    }, []);
    // TODO -> posted_at needs work so that it shows like so: 1 week old, 2 weeks old, month old... and so on.
    // probably on the backed to create it. change the interface
    return <div className={'display-flex flex-column'}>
        <Spinner isLoading={isLoading}/>
        <Filters title={'Location'} property={'location'} filters={filterOptions?.location}/>
        <Filters className={'mt-15'} property={'companyType'} title={'Type of Company'} filters={filterOptions?.companyType}/>
        <Filters className={'mt-15'} property={'industryType'} title={'Industry'} filters={filterOptions?.industryType}/>
        <Filters className={'mt-15'} property={'jobType'} title={'Job type'} filters={filterOptions?.jobType}/>
        <Filters className={'mt-15'} property={'postedAt'} title={'Date posted'} filters={filterOptions?.postedAt}/>
        <FilterButtons title={'Related roles'} property={'relatedRoles'} filters={filterOptions?.relatedRoles}/>
    </div>;
};
