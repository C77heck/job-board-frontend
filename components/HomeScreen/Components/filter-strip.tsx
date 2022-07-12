import { Button } from '../../../shared/components/buttons/button';

export interface FilterItem {
    id: string;
    title: string;
    property: number | string | undefined;
}

const Filter = ({ title, property }: FilterItem) => {
    return <Button title={title} buttonStyle={'filter'} onClick={() => console.log(property)}/>;
};

export interface Filters {
    filters: FilterItem[];
}

export const FilterStrip = ({ filters }: Filters) => {
    return <div className={'display-flex'}>
        {(filters || []).map(filter => <Filter key={filter.id} {...filter}/>)}
    </div>;
};
