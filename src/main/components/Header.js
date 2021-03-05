import React from 'react';
import SearchBar from './SearchBar';

import './Header.scss';

const Header = props => {
    return (
        <header>
            <div className='header'>
                <div className='header__title header__title--left'>
                    <h1>Get everything you need from a job</h1>
                    <h2>Search jobs in your area</h2>
                </div>
                <div className='header__title header__title--right'>
                    <h1>Upload your CV</h1>
                    <h2>It only takes a few seconds</h2>
                </div>
                <SearchBar />
            </div>
        </header>
    )
}

export default Header;