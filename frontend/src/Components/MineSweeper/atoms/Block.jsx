import React from 'react'
import './Block.css';

const Block = (props) => {

    const handleClick = (e) =>{
        if(props.hasBomb == 'bomb'){
            e.target.className = 'block block-danger';
        }
        else{
            e.target.className = 'block block-free';
        }
    }

    return(
        <div onClick = {handleClick} className='block block-inactive'></div>
    );
}

export default Block;