import React from 'react';
import Navbar from '../molecules/Navbar';
import Field from '../molecules/Field';
import GameForm from '../molecules/GameForm';
const GameManager = () =>{
    return(
        <div>
            <Navbar/>
            <GameForm/>
            <Field/>
        </div>
    )
}

export default GameManager;