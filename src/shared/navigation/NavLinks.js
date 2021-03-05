import React from 'react';

import { NavLink } from 'react-router-dom';
import Auth from '../../employers/components/Auth';
import { Notification, Star, User } from '../SVG/Icons';

import './NavLinks.scss';

export const NavLinks = () => {
    return (
        <div className='navlink'>
            <ul className='navlink__list'>
                <li className='navlink__item'>
                    <NavLink to='/' exact>Home</NavLink>
                </li>
                <li className='navlink__item'>
                    <NavLink to='/' exact>Search</NavLink>
                </li>
                <li className='navlink__item'>
                    <NavLink to='/' exact>Register</NavLink>
                </li>
                <li className='navlink__item'>
                    <NavLink to='/' exact>Advice</NavLink>
                </li>
            </ul>
        </div>
    );
}

export const NavIcons = () => {


    const notificationHandler = () => {
        console.log('clicked on notification')
    }
    const savedHandler = () => {
        console.log('clicked on save')

    }
    const authHandler = () => {
        console.log('clicked on auth')

    }

    return (
        <div className='navicon'>
            <div className='navicon__inner'>
                <div onClick={notificationHandler}><Notification /></div>
                <NavLink to='/savedjobs' exact><Star /></NavLink>
                <Auth><User /></Auth>
            </div>
        </div>
    )
}