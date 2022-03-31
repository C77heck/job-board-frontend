import { Button } from '../../../shared/components/buttons/button';

interface Filter {
    id: string;
    title: string;
    property: string;
}

const Filter = ({ title, property }: Filter) => {
    return <Button title={title} buttonStyle={'filter'} onClick={() => console.log(property)}/>;
};

interface Filters {
    filters: Filter[];
}

export const FilterStrip = ({ filters }: Filters) => {
    return <div className={'display-flex'}>
        {(filters || []).map(filter => <Filter key={filter.id} {...filter}/>)}
    </div>;
};
