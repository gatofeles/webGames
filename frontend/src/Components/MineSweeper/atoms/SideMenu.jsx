import React, { useState } from 'react';
import './SideMenu.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const SideMenu = (props) => {
    const handleCloseSideBar = () =>{
        props.onClickSideBar(false);
    }

    return (
        <div className={props.open?'menu':'off'}>
           <FontAwesomeIcon onClick={handleCloseSideBar} icon={faXmark}/>
        </div>
    )

}

export default SideMenu;