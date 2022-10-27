export interface FileData {
    lastModified: number;
    lastModifiedDate: Date;
    name: string;
    size: number;
    type: string | "image/png";
    webkitRelativePath: string;
}

export interface Attachment {
    encoding: string | "utf8";
    mimeType: string | "image/png";
    name: string;
    size: number;
    uploadName: string;
    url: string;
    alt?: string;
}

export interface Uploader {
    fileType?: 'file/*' | 'image/*';
    getIsLoading: (isLoading: boolean) => void;
    trigger: JSX.Element;
    alt?: string;
    id: string;
}

export interface MultiUploaderProps extends Uploader {
    getAttachments: (attachments: Attachment[]) => void;
}

export interface SingleUploaderProps extends Uploader {
    getAttachment: (attachments: Attachment | null) => void;
}
