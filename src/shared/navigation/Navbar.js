import React from 'react';

import './Navbar.scss';
import { NavLinks, NavIcons } from './NavLinks';


const NavBar = () => {

    return (
        <nav className='navbar'>
            <div className='navbar__inner'>
                <div className='navbar__left'>
                    <NavLinks />
                </div>
                <div className='navbar__right'>
                    <NavIcons />
                </div>
            </div>
        </nav>
    );
}


export default NavBar;