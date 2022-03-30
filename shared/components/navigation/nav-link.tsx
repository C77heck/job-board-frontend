import Link from 'next/link';

export const NavLink = (props: any) => {
    return <Link href={props.href}>
        {props.children ? props.children : props.title}
    </Link>;
};
