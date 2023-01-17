import React, { useState } from 'react';
import Navbar from '../molecules/Navbar';
import Field from '../molecules/Field';
import GameForm from '../molecules/GameForm';
import './GameManager.css';

const GameManager = () => {
    const [fieldMatrix, setFieldMatrix] = useState([]);

    const checkBoundaries = (column, row, matrix) => {
        return row >= 0 && row < matrix.length && column >= 0 && column < matrix[0].length
    }

    const getNeighborBombs = (clickedColumn, clickedRow, matrix) => {
        let bombs = 0;

        for (let x = -1; x < 2; x++) {
            for (let y = -1; y < 2; y++) {
                if (checkBoundaries(clickedRow + x, clickedColumn + y, matrix) && matrix[clickedRow + x][clickedColumn + y].hasBomb) {
                    bombs++;
                }
            }
        }

        matrix[clickedRow][clickedColumn].neighbors = bombs;
        setFieldMatrix(matrix);
        if (bombs === 0) {
            for (let x = -1; x < 2; x++) {
                for (let y = -1; y < 2; y++) {
                    if (checkBoundaries(clickedRow + x, clickedColumn + y, matrix) && !matrix[clickedRow + x][clickedColumn + y].clicked && !matrix[clickedRow + x][clickedColumn + y].hasBomb) {
                        console.log('enter');
                        matrix[clickedRow + x][clickedColumn + y].style = 'block block-free';
                        matrix[clickedRow + x][clickedColumn + y].clicked = true;
                        setFieldMatrix(matrix);
                        getNeighborBombs(clickedColumn + y, clickedRow + x, matrix);
                    }
                }
            }
        }
    }

    const updateMatrix = (clickedColumn, clickedRow) => {
        let currentMatrix = fieldMatrix.map((e) => e);
        if (currentMatrix[clickedRow][clickedColumn].hasBomb) {
            currentMatrix[clickedRow][clickedColumn].style = 'block block-danger';
            setFieldMatrix(currentMatrix);
        }
        else if (!currentMatrix[clickedRow][clickedColumn].clicked) {
            currentMatrix[clickedRow][clickedColumn].style = 'block block-free';
            currentMatrix[clickedRow][clickedColumn].clicked = true;
            getNeighborBombs(clickedColumn, clickedRow, currentMatrix);

        }
    }

    const spreadBombs = (matrix, bombs) => {
        while (bombs > 0) {
            for (let row = 0; row < matrix.length; row++) {
                for (let column = 0; column < matrix[0].length; column++) {
                    if (Math.random() > 0.95 && bombs > 0) {
                        matrix[row][column].hasBomb = true;
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

    const setMatrix = (rowNumber, ColumnNumber, bombs) => {
        let matrix = [];
        for (let row = 0; row < rowNumber; row++) {
            let rowAux = [];
            for (let column = 0; column < ColumnNumber; column++) {
                rowAux.push({
                    rowIndex: row,
                    columnIndex: column,
                    style: 'block block-inactive',
                    clicked: false,
                    neighbors: 0,
                    hasBomb: false
                })

            }
            matrix.push(rowAux);
        }
        spreadBombs(matrix, bombs);
    }

    const title = 'Minesweeper';

    return (
        <div>
            <Navbar title={title} />
            <div className='gameManager'>
                <GameForm onSubmit={setMatrix} />
                <Field matrix={fieldMatrix} onUpdateMatrix={updateMatrix} />
            </div>
        </div>
    )
}

export default GameManager;