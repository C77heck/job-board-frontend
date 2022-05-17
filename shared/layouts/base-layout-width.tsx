export const BaseLayoutWidth = (props: { className?: string; children: any; }) => {
    return <div className={`${props?.className || ''} w-100 base-layout-width position-center flex-column`}>
        {props.children}
    </div>;

};
