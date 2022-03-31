export const Header = (props: any) => {
    return <div className={'w-100 p-40 home-page--header position-center mt-110 flex-column'}>
        {props.children}
    </div>;
};
