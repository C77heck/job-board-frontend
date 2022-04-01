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
export const FilterColumn = (props: any) => {
    return <div className={'display-flex flex-column'}>
        <Filters title={'Location'} filters={dummyLocationFilters}/>
        <Filters title={'Type of Company'} filters={dummyLocationFilters}/>
        <Filters title={'Date posted'} filters={dummyLocationFilters}/>
        <FilterButtons title={'Related roles'} filters={dummyLocationFilters}/>
    </div>;
};
