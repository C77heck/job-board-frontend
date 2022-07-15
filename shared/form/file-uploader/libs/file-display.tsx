import { SvgSpinner } from '../../../components/spinner/spinner';

export interface FileDisplayProps {
    src?: string;
    alt?: string;
    uploadText: string;
    isLoading: boolean;
}

export const FileDisplay = (props: FileDisplayProps) => {
    return <SvgSpinner style={'dark'} className={'m-0'}/>;

    if (props.isLoading) {
        return <SvgSpinner/>;
    }
    if (props.src) {
        return <img className={'w-100'} src={props.src} alt={props?.alt || ''}/>;
    }
    return <span className={'fs-11'}>{props.uploadText}</span>;
};
