import { useContext, useEffect, useState } from 'react';
import { FormContext } from '../../contexts/form.context';
import { FileDisplay } from './libs/file-display';
import { Lightbox } from './libs/lightbox';
import { MultiUploader } from './libs/multi-uploader';
import { Attachment } from './libs/uploader.interfaces';

export interface IconUploderProps {
    name: string;
    namespace: string;
    alt?: string;
}

export const MultiImagesUploader = (props: IconUploderProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [options, setOptions] = useState({ viewAll: false, numberOfImg: 0, display: '' });
    const [uploadedAttachments, setUploadedAttachments] = useState<Attachment[]>([]);
    const { setData } = useContext(FormContext);

    useEffect(() => {
        setOptions({
            viewAll: uploadedAttachments.length > 3,
            numberOfImg: uploadedAttachments.length,
            display: uploadedAttachments[0]?.url || '',
        });
        setData(props.name, { value: uploadedAttachments.map(a => a.url), isValid: true }, props.namespace);
    }, [uploadedAttachments]);

    // fix the spinner and make uploaded images viewable with lightbox
    const trigger = <FileDisplay
        onClick={() => setIsLoading(true)}
        alt={'uploader-icon'}
        src={''}
        uploadText={'Upload your images'}
        isLoading={isLoading}
    />;

    return <div className={'display-flex'}>
        <MultiUploader
            getAttachments={(attachments: Attachment[]) => setUploadedAttachments(attachments)}
            getIsLoading={(isLoading: boolean) => setIsLoading(isLoading)}
            trigger={trigger}
            alt={props.alt}
        />
        {options.viewAll && <Lightbox
            trigger={<FileDisplay
                overlay={true}
                key={'lightbox'}
                uploadText={`View uploads(${options.numberOfImg})`}
                src={options.display}
            />}
            photos={uploadedAttachments.map(att => att.url)}
        />}
    </div>;
};
