import { useContext, useEffect, useState } from 'react';
import { FormContext } from '../../contexts/form.context';
import { FieldProps } from '../old-input';
import { FileDisplay } from './libs/file-display';
import { Lightbox } from './libs/lightbox';
import { MultiUploader } from './libs/multi-uploader';
import { Attachment } from './libs/uploader.interfaces';

export interface IconUploaderProps extends Omit<FieldProps, 'value'> {
    name: string;
    namespace: string;
    alt?: string;
    id: string;
    value: string[];
}

export const MultiImagesUploader = (props: IconUploaderProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [options, setOptions] = useState({ numberOfImg: 0, display: '', attachments: [''] });
    const [uploadedAttachments, setUploadedAttachments] = useState<Attachment[] | { url: string }[]>([]);
    const { setData } = useContext(FormContext);

    useEffect(() => {
        setOptions({
            numberOfImg: uploadedAttachments.length,
            display: uploadedAttachments[0]?.url || '',
            attachments: uploadedAttachments.map(att => att.url),
        });

        setData(props.name, { value: uploadedAttachments.map(a => a.url), isValid: true }, props.namespace);
    }, [uploadedAttachments]);

    useEffect(() => {
        if (props.value) {
            setUploadedAttachments((props.value || []).map(url => ({ url })));
        }
    }, [props.value]);

    const trigger = <FileDisplay
        onClick={() => setIsLoading(true)}
        alt={'uploader-icon'}
        src={''}
        uploadText={'Upload your images'}
        isLoading={isLoading}
    />;

    return <div className={'display-flex'}>
        <MultiUploader
            id={props.id}
            getAttachments={(attachments: Attachment[]) => setUploadedAttachments(attachments)}
            getIsLoading={(isLoading: boolean) => setIsLoading(isLoading)}
            trigger={trigger}
            alt={props.alt}
        />
        <ImageDisplay options={options}/>
    </div>;
};

export const ImageDisplay = ({ options }: any) => {
    if (!options.attachments.length) {
        return null;
    }

    return <Lightbox
        trigger={<FileDisplay
            overlay={true}
            key={'lightbox'}
            uploadText={`View uploads(${options.numberOfImg})`}
            src={options.display}
        />}
        photos={options.attachments}
    />;
};
