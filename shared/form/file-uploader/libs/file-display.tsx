import { SvgSpinner } from '../../../components/spinner/spinner';

export interface FileDisplayProps {
    src?: string;
    alt?: string;
    uploadText?: string;
    onClick?: () => void;
    isLoading?: boolean;
    overlay?: boolean;
}

export const FileDisplay = (props: FileDisplayProps) => {
    const content = props.isLoading
        ? <SvgSpinner style={'light'} className={'m-0'}/>
        : props.src
            ? <img className={'w-100'} src={props.src} alt={props?.alt || ''}/>
            : <span className={'fs-11'}>{props.uploadText}</span>;

    return <div
        className={'logo-uploader background-color--light-2 position-center my-10 mr-10'}
        onClick={props.onClick}
    >
        {props.overlay && <div className={'position-center position-absolute'}><span className={'fs-11'}>{props.uploadText}</span></div>}
        {content}
    </div>;
};
