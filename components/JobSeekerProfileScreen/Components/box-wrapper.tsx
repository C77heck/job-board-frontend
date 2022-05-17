import React from 'react';

interface BoxWrapperProps {
    children: any;
    className?: string;
    enableEdit?: boolean;
}

export class BoxWrapper extends React.Component<BoxWrapperProps, any> {
    public onClickHandler() {
        console.log('onClickHandler');
    }

    public renderEdit() {
        return <div onClick={() => this.onClickHandler()} className={'adjust-right hover-scale'}>
            <span className={'material-icons'}>edit</span>
        </div>;
    }

    public render() {
        return <div className={`border-radius-px-8 p-7 background-white ${this.props.className} position-relative`}>
            {this.renderEdit()}

            {this.props.children}
        </div>;
    }
}
