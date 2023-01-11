import React from 'react';
import Block from '../atoms/Block';
import './Field.css';

const Field = (props) => {

    const Row = (props) => {
        return (
            <tr>
                {props.row.map((element) => { return <td><Block hasBomb={element} /></td> })}
            </tr>
        )
    }

    return (
        <table className='row'>

            {
                props.matrix.map((row) => {
                    return <Row key={props.matrix.indexOf(row)} row={row} />
                })
            }

        </table>

    );
};

export default Field;



