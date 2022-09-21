import { ArrowLeft, ArrowRight } from './icons/icons';
import { getClasses, numArray } from '../libs/helpers';

interface Paginator {
    total: number;
    currentPage: number;
    fetchPage: (page: number) => void;
}

export const Paginator = (props: Paginator) => {
    const { total, currentPage, fetchPage } = props;
    const { startDot, startDotRef, start, endDot, endDotRef, end, middle } = getPaginationMap(total, currentPage);
    const shouldPrevBeDisabled = currentPage > 1 ? 'hover-primary' : 'color--disabled';
    const shouldNextBeDisabled = currentPage < total - 1 && total !== 1 ? 'hover-primary' : 'color--disabled';
    const prevHref = () => currentPage > 1 && fetchPage(currentPage - 1);
    const nextHref = () => currentPage < total && total !== 1 && fetchPage(currentPage + 1);

    return <div className={'position-center pb-60'}>
        <ArrowLeft width={16} className={`${shouldPrevBeDisabled} px-10 cursor-pointer`} onClick={prevHref}/>
        <Option {...props} item={start}/>
        {startDot && <Option {...props} isDot={true} item={startDotRef}/>}
        {(middle || []).map(item => <Option key={item} {...props} item={item}/>)}
        {endDot && <Option {...props} isDot={true} item={endDotRef}/>}
        {end && <Option {...props} item={end}/>}
        <ArrowRight width={16} className={`${shouldNextBeDisabled} px-10 cursor-pointer`} onClick={nextHref}/>
    </div>;
};

const Option = ({ fetchPage, item, currentPage, isDot }: any) => {
    const classes = getClasses(currentPage === item, 'color--light background-color--secondary-3 border-radius-px-4');
    return <div>
        <a
            className={`fs-25 fw--700 px-12 cursor-pointer hover-primary ${classes}`}
            onClick={() => fetchPage(item)}
        >
            {!isDot ? item : '...'}
        </a>
    </div>;
};

interface PaginationProp {
    startDot: boolean;
    startDotRef: number | boolean;
    start: number | null;
    endDot: number | boolean;
    endDotRef: number | boolean;
    end: number | null;
    middle: any[] | null;
}

export const getPaginationMap = (total: number, page: number = 1): PaginationProp => {

    if (total === 1) {
        return {
            startDot: false,
            startDotRef: false,
            start: 1,
            endDot: false,
            endDotRef: false,
            middle: [],
            end: null,
        };
    }
    const pages = numArray(total);
    const start = pages[0];
    const end = pages[pages.length - 1];

    if (pages.length <= 7) {
        return {
            startDot: false,
            startDotRef: false,
            start: start,
            endDot: false,
            endDotRef: false,
            middle: pages.slice(1, pages.length - 1),
            end: end
        };
    }
    const middle = getMiddlePaginatorValues(pages, page);

    return {
        start: start,
        startDot: pages.length > 7 && page > 2,
        startDotRef: middle[0] - 1,
        middle: middle,
        endDot: pages.length > 7 && page <= pages.length - 5,
        endDotRef: middle[middle.length - 1] + 1,
        end: end
    };
};

const getMiddlePaginatorValues = (pages: number[], page: number): number[] => {
    const trimmedPages = pages.map(i => i);
    trimmedPages.pop();
    trimmedPages.shift();

    if (page === 0) {
        return trimmedPages.slice(0, page + 4);
    }
    if (page === 1) {
        return trimmedPages.slice(page - 1, page + 2);
    }
    if (page === pages.length - 1) {
        return trimmedPages.slice(page - 4, page);
    }
    if (page > pages.length - 4) {
        return trimmedPages.slice(page - 3, page + 1);
    }

    return trimmedPages.slice(page - 2, page + 2);
};
