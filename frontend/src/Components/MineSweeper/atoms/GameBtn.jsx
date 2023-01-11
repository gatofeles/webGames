import React from 'react';
import './GameBtn.css';

const GameBtn = (props) => {

    const handleClick = (e) => {
        props.onSubmit();
    }

    return (
        <div onClick={handleClick} className='gameBtn'>{props.title}</div>
    );

}

export default GameBtn;