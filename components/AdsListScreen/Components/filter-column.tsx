import { useEffect, useState } from 'react';
import { Spinner } from '../../../shared/components/spinner/spinner';
import { useClient } from '../../../shared/hooks/client';
import { handleErrors } from '../../../shared/libs/handle-errors';
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
        salaries: [],
    });
    const getFilterOptions = async () => {
        try {
            const filterOptions = await client('/ads/ad-filters');

            setFilterOptions(filterOptions.filter);
        } catch (e) {
            handleErrors(e,error);
        }
    };

    useEffect(() => {
        (async () => await getFilterOptions())();
    }, []);

    return <div className={'display-flex flex-column'}>
        <Spinner isLoading={isLoading}/>
        <Filters title={'Location'} property={'location'} filters={filterOptions?.location}/>
        <Filters className={'mt-15'} property={'companyType'} title={'Type of Company'} filters={filterOptions?.companyType}/>
        <Filters className={'mt-15'} property={'industryType'} title={'Industry'} filters={filterOptions?.industryType}/>
        <Filters className={'mt-15'} property={'jobType'} title={'Job type'} filters={filterOptions?.jobType}/>
        <Filters className={'mt-15'} property={'postedAt'} title={'Date posted'} filters={filterOptions?.postedAt}/>
        <Filters className={'mt-15'} property={'salaries'} title={'Salary'} filters={filterOptions?.salaries}/>
        <FilterButtons title={'Related roles'} property={'relatedRoles'} filters={filterOptions?.relatedRoles}/>
    </div>;
};
