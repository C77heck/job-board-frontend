interface CompanyLogoProps {
    className?: string;
    src?: string;
    alt?: string;
}

export const CompanyLogo = (props: CompanyLogoProps) => {
    return <div className={`${props.className} company-logo`}>
        {!!props.src && <img src={props?.src || 'placeholder'} alt={props?.alt || ''}/>}
    </div>;
};
