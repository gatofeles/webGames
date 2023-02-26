import React, { useState, useEffect } from 'react';
import Navbar from '../molecules/Navbar';
import Field from '../molecules/Field';
import GameForm from '../molecules/GameForm';
import Modal from '../atoms/Modal';
import './GameManager.css';
import StrongModal from '../atoms/StrongModal';
import clock from '../../../images/clock.png';
import SideMenu from '../atoms/SideMenu';

const GameManager = () => {
    const sizeOptions = ["5x5", "8x8", "10x10"];
    const [currentSize, setCurrentSize] = useState("5x5");
    const [fieldMatrix, setFieldMatrix] = useState([]);
    const [winner, setWinner] = useState(false);
    const [gameStarted, setGameStarted] = useState(false);
    const [bombNumber, setBombNumber] = useState(0);
    const [exploded, setExploded] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [screenBlock, setScreenBlock] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [stopWatch, setStopWatch] = useState(false);
    const title = 'Minesweeper';
    const [bombLimit, setBombLimit] = useState(0);
    const [sideBarOpen, setSideBarOpen] = useState(false);

    useEffect(() => {
        if (currentSize !== "") {
            const dimensions = currentSize.split('x');
            setBombLimit(dimensions[0] * dimensions[1])
        }
    },[currentSize]);

    useEffect(() => {
        let interval = null;
        if (stopWatch) {
            interval = setInterval(() => { setCurrentTime(prevCurrentTime => prevCurrentTime + 1) }, 1000);
        }
        else {
            clearInterval(interval);
        }

        return () => clearInterval(interval);

    }, [stopWatch]);

    const checkIfGameEnded = () => {
        const fieldSize = fieldMatrix.length * fieldMatrix[0].length;
        let freedNumber = 0;
        for (let row = 0; row < fieldMatrix.length; row++) {
            for (let column = 0; column < fieldMatrix[0].length; column++) {
                if (!fieldMatrix[row][column].hasBomb && fieldMatrix[row][column].clicked) {
                    freedNumber++;
                }
            }
        }

        if (fieldSize - bombNumber === freedNumber) {
            setWinner(true);
            setStopWatch(false);
            let currentMatrix = fieldMatrix.map((e) => e);
            revielBombs(currentMatrix);

        }

    }

    const handleScreenBlock = (message) =>{
        setScreenBlock(true);
        setErrorMessage(message);
    }

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
        if (exploded) {
            handleScreenBlock('You\'ve exploded, restart the game to play again.');
        }
        else if (winner) {
            handleScreenBlock('You\'ve won, restart the game to play again.');
        }
        else if (currentMatrix[clickedRow][clickedColumn].hasBomb) {
            currentMatrix[clickedRow][clickedColumn].style = 'block block-danger';
            currentMatrix[clickedRow][clickedColumn].clicked = true;
            setFieldMatrix(currentMatrix);
            setExploded(true);
            revielBombs(currentMatrix);
            setStopWatch(false);
        }
        else if (!currentMatrix[clickedRow][clickedColumn].clicked) {
            currentMatrix[clickedRow][clickedColumn].style = 'block block-free';
            currentMatrix[clickedRow][clickedColumn].clicked = true;
            getNeighborBombs(clickedColumn, clickedRow, currentMatrix);
        }

        checkIfGameEnded();

    }

    const spreadBombs = (matrix, bombs) => {
        while (bombs > 0) {
            for (let row = 0; row < matrix.length; row++) {
                for (let column = 0; column < matrix[0].length; column++) {
                    if (Math.random() < 0.01 && bombs > 0 && !matrix[row][column].hasBomb) {
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
        setGameStarted(true);
        setStopWatch(true);

    }

    const revielBombs = (matrix) => {
            for (let row = 0; row < matrix.length; row++) {
                for (let column = 0; column < matrix[0].length; column++) {
                    if (matrix[row][column].hasBomb === true && !matrix[row][column].clicked) {

                        matrix[row][column].style = 'block block-danger-nostep';
                    }
                }
            }
        setFieldMatrix(matrix);
    }

    const handleUnblockScreen = () => {
        setScreenBlock(false);
    }

    const handleGameRestart = () => {
        setFieldMatrix([]);
        setGameStarted(false);
        setExploded(false);
        setWinner(false);
        setCurrentTime(0);
        setBombNumber(0);
        setCurrentSize("5x5");
        setStopWatch(false);
    }

    const setMatrix = (rowNumber, ColumnNumber, bombs) => {
        if (!gameStarted) {
            setBombNumber(bombs);
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
        else {
            handleScreenBlock("The game has already been started");
        }

    }

    return (
        <div>
            <Navbar gameStarted = {gameStarted} isSideBarOpen = {sideBarOpen} onClickSideBar = {setSideBarOpen} title={title} />
            <div>
                {screenBlock ?<div className='gameManager'><StrongModal onUnblock={handleUnblockScreen} message={errorMessage} /></div>  :
                    <div className='gameManager'>
                        <SideMenu open = {sideBarOpen } onClickSideBar = {setSideBarOpen} />
                        <div className='gameInner'>
                            <GameForm bombLimit = {bombLimit} onSetBombs = {setBombNumber}  bombs = {bombNumber} onChangeCurrentSize = {setCurrentSize} currentSize = {currentSize} sizeOptions = {sizeOptions} onBlock = {handleScreenBlock} onSubmit={setMatrix} onGameRestart={handleGameRestart} gameStarted={gameStarted} winner={winner} exploded={exploded} />
                            <Field matrix={fieldMatrix} onUpdateMatrix={updateMatrix} />
                            {winner ? <Modal message={"You win in " + currentTime + " seconds! Restart the game to play again!"} /> : ""}
                            {exploded ? <Modal message={"You lose in " + currentTime + " seconds! Restart the game to play again!"} /> : ""}
                            {!exploded && gameStarted && !winner ?<div id = 'clock' className = 'imageBlock'><img className='modalImage' src={clock} alt=""/><Modal message={currentTime} /></div>: ""}
                        </div>
                    </div>
                }

            </div>
        </div>
    );
}

export default GameManager;