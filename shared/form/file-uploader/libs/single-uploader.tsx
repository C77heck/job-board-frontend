import * as React from 'react';
import { useEffect, useState } from 'react';
import { useClient } from '../../../hooks/client';
import { Attachment, FileData, SingleUploaderProps } from './uploader.interfaces';

export const SingleUploader = (props: SingleUploaderProps) => {
    const [attachment, setAttachment] = useState<Attachment | null>(null);
    const [uploadQuantity, setUploadsQuantity] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { client } = useClient('attachment');

    useEffect(() => {
        props.getAttachment(attachment);
        props.getIsLoading(isLoading);

    }, [attachment, uploadQuantity, isLoading]);

    const addFiles = async (e: any) => {
        console.log('{ files: e.target.files, file: e.target.file }');

        try {
            console.log({ files: e.target.files, file: e.target.file });
            const files = e.target.files || [];
            setIsLoading(true);
            setUploadsQuantity(files.length);

            for (const file of files) {
                await addFile(file);
            }

            setIsLoading(false);
        } catch (e) {
            console.log(e);
            setIsLoading(false);
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
            } catch (err) {
                console.log(err);
            }
        };
    };

    const createAttachment = async (file: string, fileData: FileData) => {
        try {
            setIsLoading(true);
            const body = { ...fileData, file, compressionQuality: 'high', alt: props.alt };
            setIsLoading(false);

            return await client('/create', 'post', { body: body as any, headers: { 'Content-Type': 'multipart/form-data' } });
        } catch (e) {
            setIsLoading(false);
        }
    };

    return <div className={'hover-opacity'}>
        <label htmlFor={'profileImageUpload'}>{props.trigger}</label>
        <input
            onChange={(e) => addFiles(e)}
            accept="image/*"
            className={'display-none'}
            type={'file'}
            id={'profileImageUpload'}
            multiple={true}
        />
    </div>;
};
