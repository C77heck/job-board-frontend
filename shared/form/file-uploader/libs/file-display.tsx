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
    const image = <div className={'position-center w-100 h-100 background-color--grey-2'}>
        <span className={'fs-11 color--light position-absolute'}>{props.uploadText}</span>
        <img className={'w-100 opacity--low'} src={props.src} alt={props?.alt || ''}/>
    </div>;

    const content = props.isLoading
        ? <SvgSpinner style={'light'} className={'m-0'}/>
        : props.src
            ? image
            : <span className={'fs-11'}>{props.uploadText}</span>;

    return <div
        className={'logo-uploader background-color--light-2 position-center my-10 mr-10'}
        onClick={props.onClick}
    >
        {content}
    </div>;
};
