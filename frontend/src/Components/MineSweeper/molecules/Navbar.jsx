import React from 'react';
import './Navbar.css';
import DropDownMenu from '../atoms/DropDownMenu';

const Navbar = (props) => {
    return <div className='nav'>
        <DropDownMenu/>
        <div className='title'>{props.title}</div>
    </div>
}

export default Navbar;