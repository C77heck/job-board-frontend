import * as React from 'react';
import { useEffect, useState } from 'react';
import { useClient } from '../../../hooks/client.hook';
import { handleErrors } from '../../../libs/handle-errors';
import { Attachment, FileData, SingleUploaderProps } from './uploader.interfaces';

export const SingleUploader = (props: SingleUploaderProps) => {
    const [attachment, setAttachment] = useState<Attachment | null>(null);
    const [uploadQuantity, setUploadsQuantity] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { client, error } = useClient('attachment');

    useEffect(() => {
        props.getAttachment(attachment);
        props.getIsLoading(isLoading);
    }, [attachment, uploadQuantity, isLoading]);

    const addFiles = async (e: any) => {
        try {
            setIsLoading(true);

            const files = e.target.files || [];

            setUploadsQuantity(files.length);

            for (const file of files) {
                await addFile(file);
            }

            setIsLoading(false);
        } catch (e) {
            setIsLoading(false);
            handleErrors(e, error);
        }

    };

    const addFile = async (file: any) => {
        const fileData = {
            lastModified: file.lastModified,
            lastModifiedDate: file.lastModifiedDate,
            name: file.name,
            size: file.size,
            type: file.type,
            webkitRelativePath: file.webkitRelativePath,
        };

        const reader = new FileReader();

        reader.readAsArrayBuffer(file);

        reader.onload = async () => {
            try {
                const fileAsBuffer = Buffer.from((reader.result as Buffer)).toString('base64');
                const upload = await createAttachment(fileAsBuffer, fileData);
                setAttachment(upload.attachment);
                console.log('onload');
            } catch (err) {
                console.log('onload catch');
                handleErrors(err);
            }
        };
    };

    const getEndpoint = () => {
        switch (props.fileType) {
            case 'image/*':
                return '/image-upload';
            case 'file/*':
                return '/file-upload';
            default:
                return '/image-upload';
        }
    };

    const createAttachment = async (file: string, fileData: FileData) => {
        try {
            setIsLoading(true);
            const body = { ...fileData, file, compressionQuality: 'high', alt: props.alt };
            setIsLoading(false);
            // image and file uploader seperation /image-upload /file-upload
            const endpoint = getEndpoint();
            return await client(endpoint, 'POST', { body: body as any, headers: { 'Content-Type': 'multipart/form-data' } });
        } catch (e) {
            setIsLoading(false);
        }
    };

    return <div className={'hover-opacity'}>
        <label htmlFor={props.id}>{props.trigger}</label>
        <input
            onChange={(e) => addFiles(e)}
            accept={props.fileType ?? 'image/*'}
            className={'display-none'}
            type={'file'}
            id={props.id}
            multiple={false}
        />
    </div>;
};
