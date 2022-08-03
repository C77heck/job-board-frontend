import { NavLink } from '../../../shared/components/navigation/libs/nav-link';
import { priceFormat } from '../../../shared/libs/helpers';
import { FilterStrip } from './filter-strip';

export interface Post {
    id: string;
    title: string;
    description: string;
    location: string;
    salary: string;
    className?: string;
}

const dummyFilters = [
    { id: '1', title: 'Full time', property: 'Full time' },
    { id: '2', title: 'Part time', property: 'part-time' },
    { id: '3', title: 'Popular searches', property: 'Popular searches' },
    { id: '4', title: 'Entry level jobs', property: 'Entry level jobs' },
    { id: '5', title: 'Jobs by location', property: 'Jobs by location' },
    { id: '6', title: 'Jobs by company', property: 'Jobs by company' },
];

const Posting = ({ title, description, location, salary, className }: Post) => {
    return <div className={`display-flex flex-column ${className}`}>
        <h3 className={'text-color--light-1 fs-18 letter-spacing-1'}>{title} <span className={'text-color--secondary-2 fs-14 fw--400'}>({priceFormat(+salary)})</span></h3>
        <p className={'text-color--light-1 fs-14 fw--400'}>{location}</p>
        <p className={'text-color--light-1 fs-12 fw--400 mb-5'}>{description}</p>
        <NavLink href={'/'}><p className={'fs-12 fw--400 text-color--secondary-2 hover-opacity'}>See more...</p></NavLink>
    </div>;
};

export const FreshPostings = ({ data }: { data: Post[] }) => {

    return <div className={'display-flex flex-column mt-130 justify-content-center align-items-center'}>
        <FilterStrip filters={dummyFilters}/>
        <div className={'w-100 py-20 px-30 fresh-postings row'}>
            {(data || []).map(d => <Posting className={'col-20 mt-15'} key={d.id} {...d} />)}
        </div>
    </div>;
};
