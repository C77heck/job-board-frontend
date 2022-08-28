import { useEffect } from 'react';
import { useEvent } from '../../../shared/hooks/event-hook';
import { useUrlManagerHook } from '../../../shared/hooks/url-manager-hook';
import { FilterItem } from '../../HomeScreen/Components/filter-strip';

export interface FilterProps {
    filters: FilterItem[];
    title?: string;
    className?: string;
    property?: string;
}

const Filter = ({ id, title, items, property }: any) => {
    const { addToUrl } = useUrlManagerHook();
    const { event, emit, unsubscribe, subscribe } = useEvent('synthetic');

    useEffect(() => {
        subscribe((e) => console.log((e as CustomEvent).detail));

        return () => unsubscribe();
    }, []);

    return <div onClick={() => addToUrl(property, id)} className={'filter-block--item col-100 py-5 px-13 display-flex hover-secondary--background'}>
        <span className={'fs-15'}>{title}</span>
        <span className={'fs-10 pl-7 text-color--yellow'}>{items}</span>
    </div>;
};

export const Filters = ({ filters, title, className, property }: FilterProps) => {
    if (!filters) {
        return null;
    }

    return <div className={`filter-block row ${className}`}>
        {title && <h3 className={'px-13 pt-5 pb-12 fs-16 fw--900'}>{title}</h3>}
        {(filters || []).map(filter => <Filter key={filter.value} {...filter} property={property}/>)}
    </div>;
};
