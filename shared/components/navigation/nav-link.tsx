import Link from 'next/link';
import React, { forwardRef } from 'react';

export const NavLink = (props: any) => {
    return <Link href={props.href}>
        {props.children ? props.children : props.title}
    </Link>;
};
