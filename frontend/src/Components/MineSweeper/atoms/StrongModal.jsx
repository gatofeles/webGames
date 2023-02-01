import React from 'react'
import './StrongModal.css';
import GameBtn from './GameBtn';
import bomb from '../../../images/explosion.png';
import trophy from '../../../images/trophy.png';

const StrongModal = (props) => {

    return (
        <div className='strongModal'>
            <div className='smallBlock'>
                <div>{props.message}</div>
                <GameBtn onSubmit = {props.onUnblock} title = {'Ok'}/>
                {props.message.includes('exploded')?<img className='bombImage'  alt = 'Bomb' src={bomb}/>:''}
                {props.message.includes('won')?<img className='bombImage'  alt = 'Bomb' src={trophy}/>:''}
            </div>
        </div>
    );
}

export default StrongModal;