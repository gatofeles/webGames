import React, { useState, useEffect } from 'react';
import DropDownSelection from '../atoms/DropDownSelection';
import GameBtn from '../atoms/GameBtn';
import './GameForm.css';
const GameForm = (props) => {
    const sizeOptions = ["5x5", "8x8", "10x10"];
    const [currentSize, setCurrentSize] = useState("5x5");
    const [bombs, setBombs] = useState(0);
    const [bombLimit, setBombLimit] = useState(0);

    useEffect(() => {
        getBombLimit();
    },[currentSize]);

    const getBombLimit = () => {
        if (currentSize !== "") {
            const dimensions = currentSize.split('x');
            setBombLimit(dimensions[0] * dimensions[1])
        }
    }

    const handleSubmit = () => {
        if(bombs>=bombLimit){
            props.onBlock("The number of bombs should be less than the number of cells."+(bombLimit-1).toString()+" bombs for this field.");
        }
        else if (currentSize !== "" && bombs > 0) {
            const dimensions = currentSize.split("x");
            props.onSubmit(dimensions[0], dimensions[1], bombs);
        }
        
        else {
            props.onBlock("You should fill the dimension and the number of bombs.")
        }
    }

    const handleDimChange = (e) => {
        setCurrentSize(e.target.value);
    }

    const handleBombChange = (e) => {
        setBombs(e.target.value);
    }

    return (
        <form className='gameForm'>
            <div className='inputWrap'>
                {!props.gameStarted?<DropDownSelection onDimChange={handleDimChange} options={sizeOptions} name={"size"} id={"dimension"} />:''}
                {!props.gameStarted?<div>
                    <label>No. of Bombs</label>
                    <input onChange={handleBombChange} value={bombs.toString()} min={1} max={bombLimit} className='input' type="number" id="bombs" name="bombs"></input>
                </div>:''}
            </div>
            {!props.gameStarted && !props.winner && !props.exploded ? <GameBtn onSubmit={handleSubmit} title={'Set Field'} /> : <GameBtn onSubmit={props.onGameRestart} title={'Restart Game'} />}
        </form>);
}

export default GameForm;