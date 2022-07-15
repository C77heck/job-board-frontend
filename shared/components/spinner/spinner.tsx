import * as React from 'react';
import { Backdrop } from '../modal/backdrop';
import { Portal } from '../portal';

export const Spinner = (props: any) => {
    return <Portal elementId={'spinner'}>{props.asOverlay ? <Backdrop><SvgSpinner/></Backdrop> : <SvgSpinner/>}</Portal>;
};

const getStrokeColour = (style?: 'light' | 'dark' | 'regular') => {
    const light = { first: 'rgb(170,180,180)', second: 'rgb(210,215,215)', third: 'rgb(156,213,213)', fourth: 'rgb(131,136,136)' };
    const regular = { first: 'rgb(224, 222, 91)', second: 'rgb(211, 209, 109)', third: 'rgb(197, 196, 137)', fourth: 'rgb(236, 234, 147)' };
    const dark = { first: 'rgb(27,59,59)', second: 'rgb(59,94,94)', third: 'rgb(112,129,129)', fourth: 'rgb(66,89,89)' };

    switch (style) {
        case 'light':
            return light;
        case 'regular':
            return regular;
        case 'dark':
            return dark;
        default:
            return regular;
    }
};

export const SvgSpinner = (props: { style?: 'light' | 'dark' | 'regular'; className?: string }) => {
    const colour = getStrokeColour(props.style);
    return <svg className={`${props.className} spinner`} viewBox="0 0 50 50">
        <circle stroke={colour.first} className="pathd1" cx="25" cy="25" r="20" fill="none" strokeWidth="2"></circle>
        <circle stroke={colour.second} className="patdh2" cx="25" cy="25" r="15" fill="none" strokeWidth="2"></circle>
        <circle stroke={colour.third} className="patdh3" cx="25" cy="25" r="10" fill="none" strokeWidth="2"></circle>
        <circle stroke={colour.fourth} className="padth4" cx="25" cy="25" r="5" fill="none" strokeWidth="2"></circle>
    </svg>;
};
