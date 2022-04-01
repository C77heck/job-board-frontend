interface FilterItem {
    id: string;
    title: string;
    items: number;
}

interface FilterProps {
    filters: FilterItem[];
    title?: string;
}

const Filter = ({ id, title, items }: FilterItem) => {
    return <div className={'filter-block--item col-100 py-5 px-13 display-flex hover-secondary--background'}>
        <span className={'fs-15'}>{title}</span>
        <span className={'fs-10 pl-7 text-color--yellow'}>{items}</span>
    </div>;
};

export const Filters = ({ filters, title }: FilterProps) => {
    return <div className={'filter-block row mt-15'}>
        {title && <h3 className={'px-13 fs-16 fw--900'}>{title}</h3>}
        {(filters || []).map(filter => <Filter key={filter.id} {...filter} />)}
    </div>;
};
