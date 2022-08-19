import { Button } from '../../../shared/components/buttons/button';
import { useUrlManagerHook } from '../../../shared/hooks/url-manager-hook';

export interface FilterItem {
    id: string;
    title: string;
    property: string;
    items: number; // how many jobs
}

const Filter = ({ title, property, id }: FilterItem) => {
    const { addToUrl } = useUrlManagerHook();
    return <Button title={title} buttonStyle={'filter'} onClick={() => addToUrl(property, id)}/>;
};

export interface Filters {
    filters: FilterItem[];
}

export const FilterStrip = ({ filters }: Filters) => {
    return <div className={'display-flex'}>
        {(filters || []).map(filter => <Filter key={filter.id} {...filter}/>)}
    </div>;
};
