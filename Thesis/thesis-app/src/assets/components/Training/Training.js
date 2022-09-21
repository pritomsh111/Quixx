import { useState } from "react";
import { useLocation } from "react-router-dom";
import Alphanumeric from '../Alphanumeric/Alphanumeric';
import Symbol from '../Symbol/Symbol';
import CompletePhase from '../CompletePhase/CompletePhase';

const Training = () => {
    const { state } = useLocation();
    const [store, setStore] = useState([]);
    const [index, setIndex] = useState(0);
    // const [capitalIndex, setCapitalIndex] = useState([]);

    const grid =
        index < state.length ?
            /[a-zA-Z0-9]/.test(state[index]) ?
                <Alphanumeric result={store} pushResult={setStore} char={state[index].toLowerCase()} changeIndex={setIndex} /> :
                <Symbol result={store} pushResult={setStore} char={state[index]} changeIndex={setIndex} /> : <CompletePhase store={store} state={state} />;
    return grid;
}

export default Training;