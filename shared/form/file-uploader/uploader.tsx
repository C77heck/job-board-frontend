import * as React from 'react';
import { useState } from 'react';
import { useClient } from '../../hooks/client';

export interface FileData {
    lastModified: number;
    lastModifiedDate: Date;
    name: string;
    size: number;
    type: string | "image/png";
    webkitRelativePath: string;
}

export const Uploader = (props: any) => {
    const [attachments, setAttachments] = useState<any[]>([]);
    const [uploadQuantity, setUploadsQuantity] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { client } = useClient('attachment');

    const addFiles = async (e: any) => {
        try {
            const files = e.target.files || [];
            setIsLoading(true);
            setUploadsQuantity(files.length);

            for (const file of files) {
                console.log(file);
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
                setAttachments([...attachments, upload.default.payload || '']);
            } catch (err) {
                console.log(err);
            }
        };
    };

    const createAttachment = async (file: string, fileData: FileData) => {
        try {
            setIsLoading(true);
            const body = { ...fileData, file, compressionQuality: 'high' };
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
