import React from 'react';
import './Navbar.css';
import bomb from '../../../images/explode.png';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Navbar = (props) => {

    const handleSideBar = () =>{
        props.onClickSideBar(!props.isSideBarOpen)
    }

    return (
        <div className='nav'>
            {props.gameStarted?'':<FontAwesomeIcon onClick={handleSideBar} className='bg' icon={faBars} size="2x" />}
            <div className='navInner'>
                <img className='bombNav' alt='Bomb' src={bomb} />
                <div className='title'>{props.title}</div>
                <img className='bombNav' alt='Bomb' src={bomb} />
            </div>
        </div>);

}

export default Navbar;