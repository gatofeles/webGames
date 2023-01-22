import React from 'react'
import './Block.css';

const Block = (props) => {


    const handleClick = (e) => {

        if (!props.block.clicked) {
            console.log(props.block.rowIndex + "x" + props.block.columnIndex);
            props.onUpdateMatrix(props.block.columnIndex, props.block.rowIndex);

        }
    }

    return (
        <div onClick={handleClick} className={props.block.style}>{props.block.clicked && props.block.neighbors!== 0 ? props.block.neighbors : ""}</div>
    );
}

export default Block;