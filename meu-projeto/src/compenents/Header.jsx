import React from 'react';
import {Link} from 'react-router-dom';
import './Header.css'


export const Header = () => {
    return (
        <div className='pa'>
            <Link to = '/store'>Store</Link>
            <Link to = '/cart'>Cart</Link>
            <Link to ="/" className="test">Sair</Link>

        </div>
    )
}