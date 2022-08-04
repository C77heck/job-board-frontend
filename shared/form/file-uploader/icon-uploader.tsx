import { useContext, useEffect, useState } from 'react';
import { FormContext } from '../../contexts/form.context';
import { FileDisplay } from './libs/file-display';
import { SingleUploader } from './libs/single-uploader';
import { Attachment } from './libs/uploader.interfaces';

export interface IconUploaderProps {
    name: string;
    namespace: string;
    alt?: string;
    value?: string;
}

export const IconUploader = (props: IconUploaderProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [uploadedAttachment, setUploadedAttachment] = useState<Attachment | null>({ url: props.value } as any);
    const { setData } = useContext(FormContext);

    useEffect(() => {
        setData(props.name, { value: uploadedAttachment?.url, isValid: true }, props.namespace);
    }, [uploadedAttachment]);

    useEffect(() => {
        setUploadedAttachment({ url: props.value } as any);
    }, [props.value]);

    const trigger = <div
        onClick={() => setIsLoading(true)}
        className={'logo-uploader background-color--light-2 position-center my-10'}
    >
        <FileDisplay alt={uploadedAttachment?.alt} src={uploadedAttachment?.url} uploadText={'Upload your logo'} isLoading={isLoading}/>
    </div>;

    return <SingleUploader
        id={'logo-image-uploader'}
        getAttachment={(attachment) => setUploadedAttachment(attachment)}
        getIsLoading={(isLoading: boolean) => setIsLoading(isLoading)}
        trigger={trigger}
        alt={props.alt}
    />;
};
