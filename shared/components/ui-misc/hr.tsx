import * as React from 'react';
import './hr.scss';

interface HrProps {
    type?: 'light' | 'dark' | 'normal' | 'vertical';
    className?: string;
}

export class Hr extends React.Component<HrProps, any> {
    public getType() {
        switch (this.props.type) {
            case 'normal':
                return 'hr--normal';
            case 'light':
                return 'hr--light';
            case 'vertical':
                return 'hr--vertical';
            default:
                return 'hr--normal';
        }
    }

    public render() {
        return <div className={`${this.props.className && this.props.className} ${this.getType()}`}/>;
    }
}
