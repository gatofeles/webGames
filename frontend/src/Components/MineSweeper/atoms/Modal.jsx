import React from 'react'
import './Modal.css';

const Modal = (props) => {

    return (
        <div className='modal'>{props.message}</div>
    );
}

export default Modal;