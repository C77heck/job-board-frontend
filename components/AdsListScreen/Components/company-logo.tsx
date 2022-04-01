interface CompanyLogoProps {
    className?: string;
    src: string;
    alt?: string;
}

export const CompanyLogo = (props: CompanyLogoProps) => {

    return <div className={'company-logo'}>
        {!!props.src && <img src={props.src} alt={props?.alt || ''}/>}
    </div>;
};
