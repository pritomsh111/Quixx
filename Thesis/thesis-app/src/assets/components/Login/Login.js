import { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import axios from 'axios';

import classes from './Login.module.css'

function Login() {
    const { state: { result, sentence, state, trainingTime = '' } } = useLocation();
    const history = useNavigate();
    const [shown, setShown] = useState(false);
    const [password, setPassword] = useState('');
    const [checked, setChecked] = useState(true);
    const [wrongLogin, setWrongLogin] = useState(0);
    const [wrongSentence, setWrongSentence] = useState('');

    const padTo2Digits = (num) => {
        return num.toString().padStart(2, '0');
    }
    const convertMsToMinutesSeconds = useCallback((milliseconds) => {
        const minutes = Math.floor(milliseconds / 60000);
        const seconds = Math.round((milliseconds % 60000) / 1000);
        return seconds === 60
            ? `${minutes + 1} min`
            : `${minutes} min ${padTo2Digits(seconds)} sec`;
    }, []);

    useEffect(() => {
        localStorage.setItem("Login Time Start", Date.now());
        localStorage.setItem("End Time", Date.now());
        (async () => {
            if (!trainingTime) {
                await axios.patch(`${process.env.REACT_APP_URL}/update`, { id: localStorage.getItem("id"), obj: { images: [...result, sentence], trainingTime: convertMsToMinutesSeconds(+localStorage.getItem("End Time") - +localStorage.getItem("Start Time")) } });
            }
        })();
    }, [result, sentence, convertMsToMinutesSeconds, trainingTime]);
    return (
        <>
            <div className={classes.Login}>
                <div className={classes.input}>
                    <input placeholder='Password' type={checked ? "password" : "text"} value={password} onChange={({ target }) => { setPassword(target.value); setWrongSentence(); }} />
                    <span>{wrongSentence}</span>
                    <div>
                        <input type="checkbox" onChange={() => setChecked(!checked)} /> Show Password
                    </div>
                    <div>
                        <button onClick={async () => {
                            if (password === state.join('')) {
                                setShown(true);
                                await axios.patch(`${process.env.REACT_APP_URL}/update`, { id: localStorage.getItem("id"), obj: { failed: wrongLogin, loginTime: convertMsToMinutesSeconds(Date.now() - +localStorage.getItem("Login Time Start")) } });
                            }
                            else {
                                setWrongLogin(prev => prev + 1);
                                setWrongSentence('Wrong Password, Please Think Hard!');
                            }
                        }}>Login</button>
                        <button style={{ marginLeft: "1rem" }} onClick={() => {
                            localStorage.setItem("Start Time", Date.now());
                            history('/passwordShow', { state: state });
                        }}>Retake</button>
                    </div>
                </div>
                <div className={classes.hint}>
                    {
                        result.map((item, index) => (
                            <details key={`${item + index}`}>
                                <summary>Hint {index + 1}</summary>
                                <p><img alt={item} src={item} /></p>
                            </details>
                        ))
                    }
                    <details>
                        <summary>Hint {result.length + 1}: (Sentence)</summary>
                        <p style={{ padding: '1rem' }}><strong>{sentence}</strong></p>
                    </details>
                </div>
            </div>
        </>
    );
}

export default Login;