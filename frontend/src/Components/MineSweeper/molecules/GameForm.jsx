import DropDownSelection from '../atoms/DropDownSelection';
import GameBtn from '../atoms/GameBtn';
import './GameForm.css';
const GameForm = (props) => {
    
    const handleSubmit = () => {
        if(props.bombs>=props.bombLimit){
            props.onBlock("The number of bombs should be less than the number of cells."+(props.bombLimit-1).toString()+" bombs for this field.");
        }
        else if (props.currentSize !== "" && props.bombs > 0) {
            const dimensions = props.currentSize.split("x");
            props.onSubmit(dimensions[0], dimensions[1], props.bombs);
        }
        
        else {
            props.onBlock("You should fill the dimension and the number of bombs.")
        }
    }

    const handleDimChange = (e) => {
        props.onChangeCurrentSize(e.target.value);
    }

    const handleBombChange = (e) => {
        props.onSetBombs(e.target.value);
    }

    return (
        <form className={props.gameStarted?'gameFormLess':'gameForm'}>
            <div className='inputWrap'>
                {!props.gameStarted?<DropDownSelection onDimChange={handleDimChange} options={props.sizeOptions} name={"size"} id={"dimension"} />:''}
                {!props.gameStarted?<div>
                    <label>No. of Bombs</label>
                    <input onChange={handleBombChange} value={props.bombs.toString()} min={1} max={props.bombLimit} className='input' type="number" id="bombs" name="bombs"></input>
                </div>:''}
            </div>
            {!props.gameStarted && !props.winner && !props.exploded ? <GameBtn onSubmit={handleSubmit} title={'Set Field'} /> : <GameBtn onSubmit={props.onGameRestart} title={'Restart Game'} />}
        </form>);
}

export default GameForm;