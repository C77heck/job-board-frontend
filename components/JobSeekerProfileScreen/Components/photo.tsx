import * as React from 'react';

interface PhotoProps {
    id: any;
    photo: string;
    onClick: (id: string) => void;
}

export class Photo extends React.Component<PhotoProps, any> {
    public state = {
        showDelete: false,
    };

    public renderDelete() {
        return <div onClick={() => this.props.onClick(this.props.photo)} className={'w-100 h-100 background-semi-dark position-center'}>
            <span className={'material-icons active-scale color--light fs-30'}>delete_forever</span>
        </div>;
    }

    public render() {
        const photo = this.props.photo;

        return <div
            onMouseEnter={() => this.setState({ showDelete: true })}
            onMouseLeave={() => this.setState({ showDelete: false })}
            className={'mb-6 mx-4'}
        >
            <div className={'img-wrapper img-wrapper--rounded'} style={{ backgroundImage: `url(${photo})` }}>
                {this.state.showDelete && this.renderDelete()}
            </div>
        </div>;
    }
}
