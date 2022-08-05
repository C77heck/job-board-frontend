import React, { MouseEventHandler } from 'react';

export interface PaginationProp {
    startDot: boolean;
    startDotRef: number | boolean;
    start: number | null;
    endDot: number | boolean;
    endDotRef: number | boolean;
    end: number | null;
    middle: any[] | null;
}

export class Paginator extends React.Component<any, any> {

    public getMiddlePaginatorValues(pages: number[], page: number): number[] {
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
    }

    public getPaginationMap(total: number, page: number = 1): PaginationProp {

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
        const pages = Array.from({ length: total }, (v, i) => i);
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
        const middle = this.getMiddlePaginatorValues(pages, page);

        return {
            start: start,
            startDot: pages.length > 7 && page > 2,
            startDotRef: middle[0] - 1,
            middle: middle,
            endDot: pages.length > 7 && page <= pages.length - 5,
            endDotRef: middle[middle.length - 1] + 1,
            end: end
        };
    }

    public renderOption({ fetchPage, item, currentPage, isDot }: any) {
        const classes = this.getClasses(currentPage === item, 'color-background--secondary color--light', 'color--dark');
        return <div key={item} className={`px-2 min-width-fit-content w-px-30 ${classes} position-center border-radius-px-4`}>
            <a
                className={'text--paginator cursor-pointer hover-primary'}
                onClick={() => fetchPage(item)}
            >
                {!isDot ? item : '...'}
            </a>
        </div>;
    }

    public renderArrowRight(className: string, onClick: MouseEventHandler) {
        return <div
            className={`${className}`}
            onClick={onClick}
        >
            <span className={'material-icons fs-30 color--dark'}>arrow_right</span>
        </div>;
    }

    public renderArrowLeft(className: string, onClick: MouseEventHandler) {
        return <div
            className={`${className}`}
            onClick={onClick}
        >
            <span className={'material-icons fs-30 color--dark'}>arrow_left</span>
        </div>;
    }

    public getClasses(isTrue: boolean, classIfTrue: string, classIfFalse = '') {
        return isTrue ? classIfTrue : classIfFalse;
    }

    public renderPaginator() {
        const { total, currentPage, fetchPage } = this.props;
        const { startDot, startDotRef, start, endDot, endDotRef, end, middle } = this.getPaginationMap(total, currentPage);
        const shouldPrevBeDisabled = currentPage > 1 ? 'hover-primary' : 'color--disabled';
        const shouldNextBeDisabled = currentPage < total - 1 && total !== 1 ? 'hover-primary' : 'color--disabled';
        const prevHref = () => currentPage > 1 && fetchPage(currentPage - 1);
        const nextHref = () => currentPage < total && total !== 1 && fetchPage(currentPage + 1);

        return <div className={'position-center py-6 mt-7'}>
            {this.renderArrowLeft(`${shouldPrevBeDisabled} px-10 cursor-pointer display-flex align-items-end`, prevHref)}
            {this.renderOption({ ...this.props, item: start })}
            {startDot && this.renderOption({ ...this.props, item: startDotRef, isDot: true })}
            {(middle || []).map(item => this.renderOption({ ...this.props, item, key: item }))}
            {endDot && this.renderOption({ ...this.props, item: endDotRef, isDot: true })}
            {end && this.renderOption({ ...this.props, item: end })}
            {this.renderArrowRight(`${shouldNextBeDisabled} px-10 cursor-pointer display-flex align-items-end`, nextHref)}
        </div>;
    }

    public render() {
        return this.renderPaginator();
    }
}
