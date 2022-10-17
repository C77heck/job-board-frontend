import Link from 'next/link';
import React from 'react';

export const NavLink = (props: any) => {
    return <Link href={props.href} passHref>
        <CustomLink noFullWidth={props.noFullWidth} className={props.className} href={props.href}>
            {props.children ? props.children : props.title}
        </CustomLink>
    </Link>;
};

// eslint-disable-next-line react/display-name
const CustomLink = React.forwardRef((props: any, ref) => {
    const widthClasses = props.noFullWidth ? '' : 'w-100';

    return <a className={`text-decoration-none ${widthClasses} ${props.className}`} href={props.href} onClick={props.onClick}>
        {props.children ? props.children : props.title}
    </a>;
});
