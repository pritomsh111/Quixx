import { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-modal';

import classes from './Login.module.css'
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root');
function Login() {
    const { state: { result, sentence, state } } = useLocation();
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
            await axios.patch(`${process.env.REACT_APP_URL}/update`, { id: localStorage.getItem("id"), obj: { images: [...result, sentence], trainingTime: convertMsToMinutesSeconds(+localStorage.getItem("End Time") - +localStorage.getItem("Start Time")) } });
        })();
    }, [result, sentence, convertMsToMinutesSeconds]);
    return (
        <>
            <Modal
                isOpen={shown}
                onRequestClose={() => { setShown(false) }}
                style={customStyles}
                contentLabel="Information"
            >
                <div className={classes.modalDiv}>
                    <h3>Congratulations!</h3>
                    <h4>Failed Login Attempts: <strong>{wrongLogin}</strong> Times!</h4>
                    <h4>Total Training Time: <strong>{convertMsToMinutesSeconds(+localStorage.getItem("End Time") - +localStorage.getItem("Start Time"))}</strong></h4>
                    <h4>Login Time: <strong>{convertMsToMinutesSeconds(Date.now() - +localStorage.getItem("Login Time Start"))}</strong></h4>
                    <button onClick={async () => {
                        await axios.patch(`${process.env.REACT_APP_URL}/update`, { id: localStorage.getItem("id"), obj: { failed: wrongLogin, loginTime: convertMsToMinutesSeconds(Date.now() - +localStorage.getItem("Login Time Start")) } });
                        localStorage.setItem("Start Time", Date.now());
                        history('/training', { state });
                    }
                    }>Retake</button>
                </div>
            </Modal>
            <div className={classes.Login}>
                <div className={classes.input}>
                    <input placeholder='Password' type={checked ? "password" : "text"} value={password} onChange={({ target }) => { setPassword(target.value); setWrongSentence(); }} />
                    <span>{wrongSentence}</span>
                    <div>
                        <input type="checkbox" onChange={() => setChecked(!checked)} /> Show Password
                    </div>
                    <button onClick={() => {
                        if (password === state.join('')) {
                            setShown(true);
                        }
                        else {
                            setWrongLogin(prev => prev + 1);
                            setWrongSentence('Wrong Password, Please Think Hard!');
                        }
                    }}>Submit</button>
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