import React from 'react'
import './Block.css';
import bomb from '../../../images/explosion.png';
import mine from '../../../images/mine.png';
const Block = (props) => {

    const handleClick = (e) => {

        if (!props.block.clicked) {
            props.onUpdateMatrix(props.block.columnIndex, props.block.rowIndex);

        }
    }

    return (
        <div onClick={handleClick} className={props.block.style}>
            {props.block.hasBomb && props.block.clicked ? <img className='blockImage' alt='Bomb' src={bomb} /> : ''}
            {props.block.hasBomb && props.block.style.includes('nostep') ? <img className='blockImage' alt='Bomb' src={mine} /> : ''}
            {props.block.clicked && props.block.neighbors !== 0 ? props.block.neighbors : ""}
            </div>
    );
}

export default Block;