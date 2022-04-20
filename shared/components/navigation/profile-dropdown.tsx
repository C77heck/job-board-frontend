import React, { useState } from 'react';

export interface ProfileDropdown {
    trigger: JSX.Element;
    content: JSX.Element;
}

export const ProfileDropdown = (props: ProfileDropdown) => {
    const [show, setShow] = useState(false);

    return <div>
        <div onClick={() => setShow(!show)}>
            {props.trigger && props.trigger}
        </div>
        <div className={`dropdown-general dropdown dropdown--${show ? 'show' : 'hide'}`}>
            {props.content && props.content}
        </div>
    </div>;
};
