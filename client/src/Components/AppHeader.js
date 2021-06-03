import React from 'react';
import logo from '../images/logo.jpg';
import '../styles/Header.css';

const AppHeader = () => {
    return(
        <div className='app-header'>
            <div className='header container'>
                <div className='logo-container'>
                    <img src={logo} alt='library_logo' />
                </div>
                <div className='text-container'>
                    <h1 className='book_library'>Book Library System</h1>
                </div>
            </div>
        </div>
    )
}

export default AppHeader;
