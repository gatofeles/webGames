import React from 'react';
import './Navbar.css';
import bomb from '../../../images/explode.png';
const Navbar = (props) => {
    return (
    <div className='nav'>
        <img className='bombNav'  alt = 'Bomb' src={bomb}/>
        <div className='title'>{props.title}</div>
        <img className='bombNav'  alt = 'Bomb' src={bomb}/>
    </div>);

}

export default Navbar;