import FsLightbox from 'fslightbox-react';
import React from 'react';
import { numArray } from '../../../libs/helpers';

export interface LightboxProps {
    trigger: JSX.Element;
    photos: any[];
}

export class Lightbox extends React.Component<LightboxProps, any> {
    public state = { toggler: false };

    public render() {
        return <>
            <div onClick={() => this.setState({ toggler: !this.state.toggler })}>
                {this.props.trigger}
            </div>
            <FsLightbox
                toggler={this.state.toggler}
                sources={this.props.photos}
                types={numArray(this.props.photos.length).map(num => 'image')}
            />
        </>;
    }
}
