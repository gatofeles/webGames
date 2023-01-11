import React from 'react';
import './DropDownSelection.css';

const DropDownSelection = (props) => {

    return (
        <div>
            <label>Field Dimension</label>
            <select onChange={props.onDimChange} className='dropDownSelection' name={props.name} id={props.id}>
                {props.options.map((size) => {
                    return <option key = {size} value={size}>{size}</option>
                })}
            </select>
        </div>
    );
}

export default DropDownSelection;