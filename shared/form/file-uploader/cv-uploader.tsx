import { useEffect, useState } from 'react';
import { TickIcon, UploadIcon } from '../../components/icons/icons';
import { SvgSpinner } from '../../components/spinner/spinner';
import { FieldProps } from '../inputs/input';
import { SingleUploader } from './libs/single-uploader';
import { Attachment } from './libs/uploader.interfaces';

export interface CvUploaderProps extends Omit<FieldProps, 'value'> {
    name: string;
    alt?: string;
    value?: string;
}

export const CvUploader = (props: CvUploaderProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [uploadedAttachment, setUploadedAttachment] = useState<Attachment | null>({ url: props.value } as any);

    useEffect(() => {
        props.onChange({ value: uploadedAttachment?.url, valid: true, inputName: props.name });
    }, [uploadedAttachment]);

    useEffect(() => {
        setUploadedAttachment({ url: props.value } as any);
    }, [props.value]);
    // todo need the upload label to be presented
    const trigger = <div
        onClick={() => setIsLoading(true)}
        className={'cv-uploader background-color--light-1 position-center my-10'}
    >
        {isLoading
            ? <SvgSpinner style={'dark'} className={'m-0'}/>
            : uploadedAttachment?.url
                ? <TickIcon className={'color--secondary-1'} width={40}/>
                : <UploadIcon className={'color--secondary-1'} width={40}/>}
    </div>;

    return <SingleUploader
        fileType={'file/*'}
        id={'logo-image-uploader'}
        getAttachment={(attachment) => setUploadedAttachment(attachment)}
        getIsLoading={(isLoading: boolean) => setIsLoading(isLoading)}
        trigger={trigger}
        alt={props.alt}
    />;
};
