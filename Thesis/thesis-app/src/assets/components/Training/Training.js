import { useState } from "react";
import { useLocation } from "react-router-dom";
import Alphanumeric from '../Alphanumeric/Alphanumeric';
import Symbol from '../Symbol/Symbol';

const Training = () => {
    const { state } = useLocation();
    const [store, setStore] = useState([]);
    const [index, setIndex] = useState(0);
    const grid = /[a-zA-Z0-9]/.test(state[index]) ? <Alphanumeric result={store} pushResult={setStore} char={state[index].toLowerCase()} changeIndex={setIndex} /> : <Symbol result={store} pushResult={setStore} char={state[index]} changeIndex={setIndex} />;
    return index < state.length ? grid : '';
}

export default Training;