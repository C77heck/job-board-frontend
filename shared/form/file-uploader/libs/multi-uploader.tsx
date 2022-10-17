import * as React from 'react';
import { useEffect, useState } from 'react';
import { useClient } from '../../../hooks/client.hook';
import { handleErrors } from '../../../libs/handle-errors';
import { Attachment, FileData, MultiUploaderProps } from './uploader.interfaces';

export const MultiUploader = (props: MultiUploaderProps) => {
    const [attachments, setAttachments] = useState<Attachment[]>([]);
    const [attachment, setAttachment] = useState<Attachment | null>(null);
    const [uploadQuantity, setUploadsQuantity] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { client } = useClient('attachment');

    useEffect(() => {
        props.getAttachments(attachments);
        props.getIsLoading(isLoading);
    }, [attachments, uploadQuantity, isLoading]);

    useEffect(() => {
        if (!!attachment) {
            setAttachments([...attachments, attachment]);
        }
    }, [attachment]);

    const addFiles = async (e: any) => {
        try {
            const files = e.target.files || [];
            setIsLoading(true);
            setUploadsQuantity(files.length);

            for (const file of files) {
                await addFile(file);
            }

            setIsLoading(false);
        } catch (e) {
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

                setAttachment(upload.attachment || '');
            } catch (err) {
                handleErrors(err);
            }
        };
    };

    const createAttachment = async (file: string, fileData: FileData) => {
        try {
            setIsLoading(true);
            const body = { ...fileData, file, compressionQuality: 'high', alt: props.alt };
            setIsLoading(false);

            return await client('/create', 'POST', { body: body as any, headers: { 'Content-Type': 'multipart/form-data' } });
        } catch (e) {
            setIsLoading(false);
        }
    };

    return <div className={'hover-opacity'}>
        <label htmlFor={props.id}>{props.trigger}</label>
        <input
            onChange={(e) => addFiles(e)}
            accept="image/*"
            className={'display-none'}
            type={'file'}
            id={props.id}
            multiple={true}
        />
    </div>;
};
