import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import Alphanumeric from '../Alphanumeric/Alphanumeric';
import Symbol from '../Symbol/Symbol';
import CompletePhase from '../CompletePhase/CompletePhase';

import { Data } from '../../data/image';
import Popup from './../Popup/Popup';

const Training = () => {
    const { state } = useLocation();
    const [store, setStore] = useState([]);
    const [index, setIndex] = useState(0);
    const [segment, setSegment] = useState(false);

    useEffect(() => {

    });

    const grid =
        index < state.length ?
            /[a-zA-Z0-9]/.test(state[index]) ?
                <Alphanumeric Data={Data} result={store} pushResult={setStore} char={state[index].toLowerCase()} capital={state[index].charCodeAt(0) >= 65 && state[index].charCodeAt(0) <= 90} changeIndex={setIndex} /> :
                <Symbol result={store} pushResult={setStore} char={state[index]} changeIndex={setIndex} /> : <CompletePhase result={store} state={state} />;
    return (
        <>
            <Popup shown={segment} setShown={setSegment}>
                <div>
                    <label htmlFor="segment">Write 3 Previously Learned Characters</label>
                    <input id="segment" type="text" placeholder="Example: $7c"></input>
                </div>
            </Popup>
            {grid}
        </>

    );
}

export default Training;