import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Alphanumeric from '../Alphanumeric/Alphanumeric';
import Symbol from '../Symbol/Symbol';

const Training = () => {
    const { state } = useLocation();
    const [store, setStore] = useState([]);
    const [index, setIndex] = useState(0);
    const char = ["-", "a"];
    const grid = /[a-zA-Z0-9]/.test(char[index]) ? <Alphanumeric result={store} pushResult={setStore} char={char[index]} changeIndex={setIndex} /> : <Symbol result={store} pushResult={setStore} char={char[index]} changeIndex={setIndex} />;
    return grid;
}

export default Training;