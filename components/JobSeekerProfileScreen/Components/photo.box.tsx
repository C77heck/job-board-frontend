import * as React from 'react';
import { Component } from 'react';
import { UploaderMulti } from '../../../shared/components/file-upload/file-uploader';
import { Lightbox } from '../../../shared/components/lightbox/light-box';
import { BoxWrapper } from './box-wrapper';
import { EditPhotos } from './forms/edit.photos';

export class PhotoBox extends Component<any, any> {
    public state = { meta: {photos: ['']} };

    public renderImage(photo: string, isOverlay = false) {
        const trigger = !isOverlay
            ? <div className={'img-wrapper img-wrapper--rounded hover-opacity'} style={{ backgroundImage: `url(${photo})` }}/>
            : <div className={'img-wrapper img-wrapper--rounded hover-opacity'} style={{ backgroundImage: `url(${photo})` }}>
                {this.renderLastImage()}
            </div>;

        return <Lightbox
            photos={this.state.meta.photos || []}
            trigger={trigger}
        />;
    }

    public renderLastImage() {
        const photosLength = (this.state.meta?.photos || []).length;

        if (photosLength > 8) {
            return <div
                className={'img-overlay'}
                onClick={() => console.log('let`s look at the other pictures...')}
            >
                <span>+{photosLength - 8}</span>
            </div>;
        }

        return null;
    }

    public async updateUserInfo(photos: string[]) {
        console.log('sending update');
    }

    public addMore() {
        return <UploaderMulti
            onUploadSuccess={(attachments: any) => this.updateUserInfo(attachments)}
            trigger={<div className={'img-wrapper img-wrapper--rounded hover-opacity background-dark position-center mb-6 mx-4'}>
                <span className={'material-icons color--light'}>add_a_photo</span>
            </div>}
        />;
    }

    public renderImages() {
        if (this.state.meta?.photos && this.state.meta?.photos.length) {
            return <div className={'display-flex flex-wrap'}>
                {this.addMore()}
                {(this.state.meta.photos.slice(0, 8)).map((photo: string, index: number) => <div className={'mb-6 mx-4'} key={`${photo}-${index}`}>{this.renderImage(photo, index === 7)}</div>)}
            </div>;
        }

        return this.props.enableEdit ? this.addMore() : <div className={'w-100 position-center'}><span>Some title</span></div>;
    }

    public render() {
        return <BoxWrapper
            content={<EditPhotos meta={this.state.meta}/>}
            enableEdit={this.props.enableEdit}
        >
            <h6 className={'fw-bold text--small'}>h2 title</h6>
            {this.renderImages()}
        </BoxWrapper>;
    }
}
