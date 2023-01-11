import React, {useState} from 'react';
import './DropDownMenu.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const DropDownMenu = () => {
    const [closed, setClosed] = useState(true);

    const handleClick = (e) => {
        setClosed(!closed);
    }

    return(
       <div className ="dropdown">
        <FontAwesomeIcon onClick = {handleClick} icon={faBars} size="2x" />  
           <ul className={closed?"dropdown-content":"dropdown-content dropdown-content-visible"}>
               <li className='option'>Ranking</li>
               <li className='option'>Logout</li>
           </ul>
       </div>
       
    )

}

export default DropDownMenu;