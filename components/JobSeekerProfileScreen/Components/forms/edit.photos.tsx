import * as React from 'react';
import { Component } from 'react';
import { UploaderMulti } from '../../../../shared/components/file-upload/file-uploader';
import { Photo } from '../photo';

export class EditPhotos extends Component<any, any> {

    public state = { photos: [] };

    public componentDidMount() {
        this.setState({ photos: this.props.meta?.photos });
    }

    public async deletePhoto(photoId: string) {
        console.log('deleting photo');
    }

    public renderPhoto(photo: string, index: number) {
        return <div key={`${photo}-${index}`}>
            <Photo photo={photo} id={index} onClick={(photoId: string) => this.deletePhoto(photoId)}/>
        </div>;
    }

    public async updateUserInfo(photos: string[]) {
        console.log('updating photo');
    }

    public addMore() {
        return <UploaderMulti
            onUploadSuccess={(attachments: any) => this.updateUserInfo(attachments)}
            trigger={<div className={'img-wrapper img-wrapper--rounded hover-opacity background-dark position-center mb-6 mx-4'}>
                <span className={'material-icons color--light'}>add_a_photo</span>
            </div>}
        />;
    }

    public renderPhotos() {
        return <div className={'display-flex flex-wrap max-height-392 overflow-scroll'}>
            {this.addMore()}
            {(this.state.photos || []).map((photo, index) => this.renderPhoto(photo, index))}
        </div>;
    }

    public render() {
        return <div className={'p-box w-100'}>
            <h2 className={'mb-8'}>some h2 title</h2>
            {this.state.photos && this.state.photos.length && this.renderPhotos()}
        </div>;
    }
}
