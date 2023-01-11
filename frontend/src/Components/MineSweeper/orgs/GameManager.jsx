import React, {useState} from 'react';
import Navbar from '../molecules/Navbar';
import Field from '../molecules/Field';
import GameForm from '../molecules/GameForm';
import './GameManager.css';
const GameManager = () => {
    const [fieldMatrix, setFieldMatrix] = useState([]);
    
    const spreadBombs = (matrix, bombs) => {
        while (bombs > 0) {
            for (let row = 0; row < matrix.length; row++) {
                for (let column = 0; column < matrix[0].length; column++) {
                    if (Math.random() > 0.7 && bombs > 0) {
                        matrix[row][column] = 'bomb';
                        bombs--;
                    }
                }
                if (bombs <= 0) {
                    break;
                }
            }
        }

        setFieldMatrix(matrix);
    }

    const setMatrix = (rows, columns, bombs) => {
        let matrix = [];
        for (let row = 0; row < rows; row++) {
            let row = [];
            for (let column = 0; column < columns; column++) {
                row.push('free');
            }
            matrix.push(row);
        }
        spreadBombs(matrix, bombs);
    }

    const title = 'Minesweeper';

    return (
        <div>
            <Navbar title={title} />
            <div className='gameManager'>
                <GameForm onSubmit = {setMatrix} />
                <Field matrix = {fieldMatrix} onSetMatrix = {setFieldMatrix}/>
            </div>
        </div>
    )
}

export default GameManager;