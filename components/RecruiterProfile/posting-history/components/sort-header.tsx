import { useEffect, useState } from 'react';

export type Sort = { [key: string]: number };

export interface SortHeaderProps {
    title: string;
    onChange?: (sort: Sort) => void;
    property?: string;
    disabled?: boolean;
    align?: 'left' | 'center' | 'right';
}

export const SortHeader = (props: SortHeaderProps) => {
    const [direction, setDirection] = useState('');

    const clickHandler = () => {
        if (props.disabled) {
            return;
        }
        setDirection(() => {
            switch (direction) {
                case 'down':
                    return 'up';
                case 'up':
                    return '';
                default:
                    return 'down';
            }
        });
    };

    useEffect(() => {
        if (props.onChange && !props.disabled && props.property) {
            props.onChange({ [props.property]: direction === 'down' ? -1 : 1 });
        }
    }, [direction]);

    const getAlignment = () => {
        switch (props.align) {
            case 'left':
                return 'justify-content-start';
            case 'right':
                return 'justify-content-end';
            case 'center':
                return 'justify-content-center';
            default:
                return 'justify-content-center';
        }
    };

    return <div
        onClick={clickHandler}
        className={`w-100 display-flex align-items-center hover-opacity position-relative ${getAlignment()}`}
    >
        <span className={'position-absolute left-0'}>{direction}</span>
        <span className={'uppercase fs-16 fw--700'}>{props.title}</span>
    </div>;
};
