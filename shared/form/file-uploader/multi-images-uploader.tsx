import { useContext, useEffect, useState } from 'react';
import { FormContext } from '../../contexts/form.context';
import { FileDisplay } from './libs/file-display';
import { MultiUploader } from './libs/multi-uploader';
import { Attachment } from './libs/uploader.interfaces';

export interface IconUploderProps {
    name: string;
    namespace: string;
    alt?: string;
}

export const MultiImagesUploader = (props: IconUploderProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [uploadedAttachments, setUploadedAttachments] = useState<Attachment[]>([]);
    const { setData } = useContext(FormContext);

    useEffect(() => {
        setData(props.name, { value: uploadedAttachments.map(a => a.url), isValid: true }, props.namespace);
    }, [uploadedAttachments]);

    // fix the spinner and make uploaded images viewable with lightbox
    const trigger = <div
        onClick={() => setIsLoading(true)}
        className={'logo-uploader background-color--light-2 position-center my-10'}
    >
        <FileDisplay alt={'uploader-icon'} src={''} uploadText={'Upload your images'} isLoading={isLoading}/>
    </div>;

    return <MultiUploader
        getAttachments={(attachments: Attachment[]) => setUploadedAttachments(attachments)}
        getIsLoading={(isLoading: boolean) => setIsLoading(isLoading)}
        trigger={trigger}
        alt={props.alt}
    />;
};
