import { Button } from '../../../shared/components/buttons/button';
import { FilterItem } from '../../HomeScreen/Components/filter-strip';
import { FilterProps } from './filters';

const Filter = ({ title, items }: FilterItem) => {
    return <Button className={'m-4'} title={title} buttonStyle={'filter-buttons'} onClick={() => console.log(items)}/>;
};

export const FilterButtons = ({ title, filters }: FilterProps) => {
    return <div className={'mt-15'}>
        {title && <h3 className={'px-13 pt-5 pb-12 fs-16 fw--900'}>{title}</h3>}
        <div className={'display-flex flex-wrap'}>
            {(filters || []).map(filter => <Filter key={filter.id} {...filter} />)}
        </div>
    </div>;
};
