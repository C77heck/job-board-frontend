import * as React from 'react';
import { useState } from 'react';
import { useClient } from '../../hooks/client';

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
                await addFile(file);
            }

            setIsLoading(false);
        } catch (e) {
            console.log(e);
            setIsLoading(false);
        }

    };

    const addFile = async (file: any) => {
        const reader = new FileReader();

        reader.readAsArrayBuffer(file);

        reader.onload = async () => {
            try {
                const upload = await createAttachment(Buffer.from((reader.result as Buffer)).toString('base64'));
                setAttachments([...attachments, upload.default.payload || '']);
            } catch (err) {
                console.log(err);
            }
        };
    };

    const createAttachment = async (data: string) => {
        try {
            setIsLoading(true);
            return await client('/create', 'post', { body: data, headers: {'Content-Type': 'multipart/form-data'} }, {},);
        } catch (e) {
            console.log(e);
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
