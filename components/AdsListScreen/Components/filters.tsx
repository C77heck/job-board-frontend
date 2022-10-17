import { useUrlManagerHook } from '../../../shared/hooks/url-manager.hook';
import { FilterItem } from '../../HomeScreen/Components/filter-strip';

export interface FiltersProps {
    filters: FilterItem[];
    title?: string;
    className?: string;
    property: string;
}

export interface FilterProps {
    filter: FilterItem;
    property: string;
}

const Filter = ({ filter, property }: FilterProps) => {
    const { title, value, items } = filter;
    const { addToUrl, getIsInQuery } = useUrlManagerHook();
    const activeClass = getIsInQuery(property, value) ? 'filter--active hover-opacity' : 'hover-secondary--background';

    return <div onClick={() => addToUrl(property, value)} className={`${activeClass} filter-block--item col-100 py-5 px-13 display-flex`}>
        <span className={'fs-15'}>{title}</span>
        <div className={'filter-items-counter'}>
            <span className={'fs-10 color--yellow'}>{items}</span>
        </div>
    </div>;
};

export const Filters = ({ filters, title, className, property }: FiltersProps) => {
    if (!filters || !filters.length) {
        return null;
    }

    return <div className={`filter-block row ${className}`}>
        {title && <h3 className={'px-13 pt-5 pb-12 fs-16 fw--900'}>{title}</h3>}
        {(filters || []).map(filter => <Filter key={filter?.value} filter={filter} property={property}/>)}
    </div>;
};
