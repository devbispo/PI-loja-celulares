import React from 'react';
import {Link} from 'react-router-dom';
import './Header.css'


export const Header = () => {
    return (
        <div className='pa'>
            <Link to = '/'>Store</Link>
            <Link to = '/cart'>Cart</Link>

        </div>
    )
}