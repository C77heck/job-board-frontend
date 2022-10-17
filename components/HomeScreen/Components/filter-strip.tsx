import { Button } from '../../../shared/components/buttons/button';
import { useUrlManagerHook } from '../../../shared/hooks/url-manager.hook';

export interface FilterItem {
    value: string;
    title: string;
    items: number; // how many jobs
}

export interface FilterProps {
    data: FilterItem;
    property: string;
}

const Filter = ({ data: { title, value }, property }: FilterProps) => {
    const { addToUrl } = useUrlManagerHook();

    return <Button title={title} buttonStyle={'filter'} onClick={() => addToUrl(property, value)}/>;
};

export interface Filters {
    filters: FilterItem[];
}

export const FilterStrip = ({ filters }: Filters) => {
    return <div className={'display-flex'}>
        {(filters || []).map(filter => <Filter key={filter.value} property={'something'} data={filter}/>)}
    </div>;
};
