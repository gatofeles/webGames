import React from 'react'
import './StrongModal.css';
import GameBtn from './GameBtn';

const StrongModal = (props) => {

    return (
        <div className='strongModal'>
            <div className='smallBlock'>
                <div>{props.message}</div>
                <GameBtn onSubmit = {props.onUnblock} title = {'Ok'}/>
            </div>
        </div>
    );
}

export default StrongModal;