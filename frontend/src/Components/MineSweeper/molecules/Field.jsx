import React from 'react';
import Block from '../atoms/Block';
import './Field.css';

const Row = (props) => {
    return (
        <tr>
            {props.row.map((element) => { return <td key={element.rowIndex + "x" + element.columnIndex} ><Block onUpdateMatrix={props.onUpdateMatrix} block={element} /></td> })}
        </tr>
    )
}


const Field = (props) => {

    return (
        <table className='row'>
            <tbody>
                {
                    props.matrix.map((row) => {
                        return <Row key={props.matrix.indexOf(row)} onUpdateMatrix={props.onUpdateMatrix} row={row} />
                    })
                }
            </tbody>
        </table>

    );
};

export default Field;



